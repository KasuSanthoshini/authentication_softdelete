import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, otp: string, otpExpiry: Date): Promise<void> => {
    // Configure the transporter using Mailtrap
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST, // Mailtrap's SMTP Host
        port: parseInt(process.env.MAILTRAP_PORT || "2525"), // Mailtrap's SMTP Port (default 2525)
        auth: {
            user: process.env.MAILTRAP_USER, // Your Mailtrap username
            pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
        },
    });

    // Construct the HTML body of the email
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Your requested OTP: ${otp}</h2>
            <p>Dear User,</p>
            <p>We received a request to reset your password. Use the OTP code below to proceed:</p>
            <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</p>
            <p>This OTP is valid for 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p>Poditivity</p>
        </div>
    `;

    // Send the email
    await transporter.sendMail({
        from: `"Your App Name" <no-reply@poditivity.com/>`, // Sender's name and email
        to, // Recipient's email
        subject, // Email subject
        html, // HTML body
    });
};
