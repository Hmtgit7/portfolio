// src/controllers/contactController.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import { sendEmail } from '../config/email';
import { ContactRequest } from '../types';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body as ContactRequest;

    // Send email notification
    await sendEmail({
        to: process.env.EMAIL_TO as string,
        subject: `Portfolio Contact: ${subject || 'New Message'}`,
        text: `
      You have received a new message from your portfolio contact form.
      
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
        html: `
      New Contact Form Submission
      You have received a new message from your portfolio contact form.
      Contact Details:
      
        Name: ${name}
        Email: ${email}
      
      Message:
      ${message}
    `,
    });

    res.status(201).json({
        success: true,
        data: {
            name,
            email,
            subject: subject || 'Portfolio Contact Form',
            message,
            createdAt: new Date(),
        },
        message: 'Contact form submitted successfully',
    });
});

// @desc    Get all contact submissions (for admin)
// @route   GET /api/contact
// @access  Private (should be protected in production)
export const getContactSubmissions = asyncHandler(async (req: Request, res: Response) => {
    res.json({
        success: true,
        count: 0,
        data: [],
    });
});