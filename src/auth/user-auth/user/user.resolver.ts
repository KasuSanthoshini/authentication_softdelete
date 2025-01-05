import { errorLogger } from '../../../utils/functions/logger';
import { Resolvers,User, UserInDb } from '../../../utils/types/generated';
import { DateScalar, create, findUserByCredential, findUserById, forgotPassword, getUserDetailsByToken, resetPassword, softDeleteUser, restoreUser } from './user.model';
import { compare } from 'bcrypt'; 
import { generateToken } from '../../../utils/functions/auth'; 




export const resolver: Resolvers = {
    Date: DateScalar,
    Query: {
        
        findUserById: async (parent, args) => {
            try {
                // Pass both parent and args to the findUserById function
                const user = await findUserById(parent, args);
                if (!user) throw new Error('User not found');
                return user;
            } catch (error) {
                throw errorLogger(error);
            }
        },
        
        getUserDetailsByToken: async (parent: any, args: { authToken: string }): Promise<User> => {
            const { authToken } = args; // Assuming the token is passed in args
            try {
              const userInDb = await getUserDetailsByToken(authToken); // Get user by token
          
              // Transform the `userInDb` to match the GraphQL `User` type
              const user: User = {
                _id: userInDb._id.toString(), // Convert ObjectId to string
                email: userInDb.email,
                displayName: userInDb.displayName,
                userName: userInDb.userName,
                mobileNumber: userInDb.mobileNumber,
                aadharNumber: userInDb.aadharNumber,
                createdAt: userInDb.createdAt,
                deleted: !!userInDb.deleted, // Convert `Boolean` to primitive `boolean`
              };
          
              return user;
            } catch (error: unknown) {
              // Handle error safely
              if (error instanceof Error) {
                throw new Error('Unauthorized: ' + error.message);
              } else {
                throw new Error('An unknown error occurred');
              }
            }
          },          
    },
    Mutation: {
        signUp: async (parent, args) => {
            try {
                await create(args.input); // Insert the user into the database.
                return "User Registered Successfully"; // Return a success message.
            } catch (error) {
                const loggedError = errorLogger(error); // Log the error for debugging.
                throw new Error(loggedError.message || "Failed to register user"); // Return an error message.
            }
        },
        signIn: async (parent, args) => {
            const { credential, password } = args.input;
        
            try {
                const user = await findUserByCredential(credential);
                console.log("this is returned user",user);
                
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                
                console.log(`Entered password: ${password}`);
                console.log(`Password from DB: ${user.password}`);
                
                const isPasswordValid = await compare(password, user.password); // Compare the plain password with the hashed password
                console.log("Password is valid: ", isPasswordValid);
        
                if (!isPasswordValid) {
                    throw new Error('Invalid credentials');
                }
        
                const token = generateToken({ id: user._id });
                return token;
            } catch (error) {
                const loggedError = errorLogger(error);
                throw new Error(loggedError.message || 'Failed to authenticate user');
            }
        },
        forgotPassword: async (_, args) => {
            try {
                const result = await forgotPassword(args.input.email);
                return result;  // Return the success message for OTP sent
            } catch (error) {
                throw errorLogger(error);
            }
        },
        resetPassword: async (parent, args) => {
            // Validate and extract input safely
            if (!args.input) {
                throw new Error('Input is required');
            }
        
            const { email, otp, newPassword } = args.input;
            
            try {
                // Call the reset password logic
                return await resetPassword(email, otp, newPassword);
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || 'Failed to reset password');
                }
                throw new Error('Unknown error occurred while resetting password');
            }
        },        
    },
    softDeleteUser: async (parent: any, args: { userId: string }) => {
      const { userId } = args;
      try {
        // Some operation
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } 
    },
    restoreUser: async (parent: any, args: { userId: string }) => {
      try {
        // Call the utility function to restore the user
        return await restoreUser(parent, args); // Pass the 'args' directly
      } catch (error) {
        console.error("Error in restoreUser:", error);
        throw new Error("An error occurred while restoring the user.");
      }
    },
};
