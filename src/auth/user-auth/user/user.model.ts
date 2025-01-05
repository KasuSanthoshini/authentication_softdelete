import { ObjectId } from 'mongodb';
import { env } from '../../../utils/config/env';
import { db } from '../../../utils/functions/db';
import { User, UserInDb, UserInput, UserInputSchema } from '../../../utils/types/generated';
import { hash } from 'bcrypt';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../../utils/functions/sendEmail';

const userCollection = db.collection<UserInDb>(env.USER_COLLECTION);

import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Date',
  parseValue(value: unknown): Date | null {
    if (typeof value === 'string') {
      return new Date(value);  // Parse the incoming value as Date
    }
    return null;
  },
  serialize(value: unknown): string | null {
    if (value instanceof Date) {
      return value.toISOString();  // Return the Date as an ISO string
    }
    return null;
  },
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);  // Parse date from string literal
    }
    return null;
  },
});

export const findUserById = async (parent: any, args: { userId: string }): Promise<User> => {
    try {
      const userInDb = await userCollection.findOne({ _id: new ObjectId(args.userId) as any });
      
      if (!userInDb) throw new Error('User not found');
  
      // Convert the `WithId<UserInDb>` to `User` and ensure the `deleted` field is a primitive boolean
      const user: User = {
        _id: userInDb._id.toString(),  // Convert ObjectId to string
        email: userInDb.email,
        displayName: userInDb.displayName,
        userName: userInDb.userName,
        mobileNumber: userInDb.mobileNumber,
        aadharNumber: userInDb.aadharNumber,
        createdAt: userInDb.createdAt,
        deleted: userInDb.deleted === true,  // Ensure `deleted` is a primitive boolean
      };
  
      return user;
    } catch (error) {
      throw new Error('Error retrieving user: ' + error);
    }
  };

export const create = async (input: UserInput) => {
    const parsedInput = UserInputSchema().parse(input); // Validate input using schema

    // Hash the password before saving it
    const hashedPassword = await hash(parsedInput.password, 10); // 10 salt rounds is a common choice

    // Create the user object, replacing the plain password with the hashed one
    const user: UserInDb = {
        ...parsedInput,
        password: hashedPassword, // Store the hashed password
        _id: new ObjectId().toString(),
        createdAt: new Date(),
        deleted: false,
    
    };

    // Insert the user into the database
    await userCollection.insertOne(user);

    return user;
};

export const findUserByCredential = async (credential: string) => {
    console.log("this is credential",credential);
    
    const user = await userCollection.findOne({
        $or: [{ email: credential }, { userName: credential }],
    });
    console.log(`founded user ${user}`);
    
    return user;
};

  
export const getUserDetailsByToken = async (authToken: string) => {
    try {
      // Step 1: Validate and decode the JWT token
      let decoded: JwtPayload | string;
      try {
        decoded = jwt.verify(authToken, env.JWT_SECRET);
      } catch (error) {
        throw new Error('Invalid or expired token');
      }
  
      // Step 2: Extract user ID (or any other necessary data) from the decoded token
      if (typeof decoded === 'string') {
        throw new Error('Invalid token format');
      }
  
      const userId = decoded.id; // Ensure 'id' exists in the token payload
  
      if (!userId) {
        throw new Error('User ID not found in token');
      }
  
      // Step 3: Convert the userId to ObjectId
      const objectId = new ObjectId(userId); // Convert the string ID to ObjectId
  
      // Step 4: Fetch the user from the database using ObjectId
      const user = await userCollection.findOne({ _id: objectId as any});
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Step 5: Return user details
      return user;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
  };
  

export const forgotPassword = async (email: string): Promise<string> => {
    const user = await userCollection.findOne({ email });

    if (!user) {
        throw new Error('No user found with this email address');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();  // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes
    

    await userCollection.updateOne(
        { email },
        { $set: { resetOtp: otp, resetOtpExpiry: otpExpiry } }
    );

    await sendEmail(email, 'Password Recovery OTP',otp,otpExpiry);



    return 'OTP sent successfully. Please check your email.';
};

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<string> => {
    try {
        // Fetch the user by email
        const user = await userCollection.findOne({ email });
        
        // If user is not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Ensure both resetOtp and resetOtpExpiry are present in the user object
        if (!('resetOtp' in user && 'resetOtpExpiry' in user)) {
            throw new Error('Invalid or expired OTP');
        }

        // Ensure both the entered OTP and the stored OTP are strings (for accurate comparison)
        if (String(user.resetOtp) !== String(otp)) {
            console.log(`OTP does not match!`);
            throw new Error('Invalid OTP');
        }

        // Check if OTP has expired
        const expiryDate = new Date(user.resetOtpExpiry as string);
        if (new Date() > expiryDate) {
            console.log("OTP has expired!");
            throw new Error('OTP has expired');
        }

        // If OTP exists and has been used (i.e., removed from DB), prevent resetting
        if (!user.resetOtp) {
            throw new Error('OTP has already been used or is invalid');
        }

        // Hash the new password
        const hashedPassword = await hash(newPassword, 10);

        // Update the user's password and remove OTP fields from the database
        const result = await userCollection.updateOne(
            { _id: user._id },
            {
                $set: { password: hashedPassword },
                $unset: { resetOtp: "", resetOtpExpiry: "" }, // Remove OTP-related fields after use
            }
        );

        // Check if the update was successful
        if (result.modifiedCount === 0) {
            throw new Error('Failed to reset password');
        }

        return 'Password reset successfully';
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error instanceof Error) {
            throw new Error(error.message || 'An error occurred while resetting password');
        } else {
            throw new Error('An error occurred while resetting password');
        }
    }
    
};


export const softDeleteUser = async (
  parent: any,
  args: { userId: string }
): Promise<string> => { // Return type should be string as you're returning a message
  const { userId } = args; // Destructure userId from args

  const result = await userCollection.updateOne(
    { _id: userId },
    { $set: { deleted: true } }
  );

  if (result.modifiedCount === 0) {
    throw new Error('User not found or already deleted');
  }

  return 'User soft-deleted successfully';
};
  
  // Add restore functionality
  export const restoreUser = async (
    parent: any,
    args: { userId: string }
  ): Promise<string> => { // Return type should be string as you're returning a message
    const { userId } = args; // Destructure userId from args
  
    const result = await userCollection.updateOne(
      { _id: userId },
      { $set: { deleted: false } }
    );
  
    if (result.modifiedCount === 0) {
      throw new Error('User not found or already restored');
    }
  
    return 'User restored successfully';
  };
  





