// src/config/email.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

// Create transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<void> => {
    const message = {
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };

    await transporter.sendMail(message);
};

export default transporter;