import { Context } from 'hono';
import { render } from '@react-email/components';
import * as nodemailer from 'nodemailer';
import React from 'react';
import path from 'path';
import { getEmailsDirectory } from '../utils/fileUtils';

const createTransporter = () => {
    const host = process.env.EMAIL_HOST;
    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined;
    const secure = process.env.EMAIL_SECURE === 'true'; // Convert string to boolean
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || port === undefined || user === undefined || pass === undefined) {
        console.error('ERROR: Email environment variables are not properly configured.');
        console.error('Ensure EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS are set in your environment.');
        throw new Error('Email service variables are not configured.');
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });

    console.log('LOG: Email transporter created successfully.');
    return transporter;
};

// Initialize the transporter when the module loads
let transporter: nodemailer.Transporter | null = null;
try {
    transporter = createTransporter();
} catch (error) {
    console.error('ERROR: Failed to create email transporter during module initialization:', error);
    // Optionally, you might want to handle this more gracefully depending on your application's needs.
    // For example, you could set a flag to indicate that email functionality is unavailable.
}

export const sendEmailRoute = async (c: Context) => {
    if (!transporter) {
        console.error('ERROR: Email transporter is not initialized. Cannot send email.');
        return c.json({ error: 'Email service is not configured.' }, 500);
    }

    try {
        const body = await c.req.json();
        if (!body) {
            console.error('ERROR: Request body is missing or invalid.');
            return c.json({ error: 'Request body is missing or invalid.' }, 400);
        }

        const { to, subject, template } = body;
        const { name, data } = template;

        console.log('LOG: Received email request:', { to, subject, templateName: name });

        const emailsDir = getEmailsDirectory();
        const templatePath = path.join(emailsDir, `${name}.tsx`);
        console.log('LOG: Attempting to load email template from:', templatePath);

        let mod;
        try {
            mod = await import(templatePath);
            console.log(`LOG: Successfully imported email template: ${name}`);
        } catch (err: any) {
            if (err.code === 'ERR_MODULE_NOT_FOUND') {
                console.error(`ERROR: Email template "${name}" not found at path: ${templatePath}`);
                return c.json({ error: `Email template "${name}" not found` }, 404);
            }
            console.error('ERROR: Failed to import email template:', err);
            return c.json({ error: 'Failed to load email template' }, 500);
        }

        const EmailComponent = mod.default;

        if (!EmailComponent) {
            console.error(`ERROR: No default email component exported from "${name}" at path: ${templatePath}`);
            return c.json({ error: `No default email component exported from "${name}"` }, 400);
        }

        console.log(`LOG: Rendering email template "${name}" with data:`, data);
        const emailHtml = await render(React.createElement(EmailComponent, data));
        console.log('LOG: Email template rendered successfully.');

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: emailHtml,
        };

        console.log('LOG: Sending email with options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });
        const info = await transporter.sendMail(mailOptions);
        console.log('LOG: Email sent successfully. Message ID:', info.messageId);

        return c.json({ status: 'Email sent', messageId: info.messageId });

    } catch (err) {
        console.error('ERROR: An error occurred while processing the email:', err);
        return c.json({ error: 'Failed to send email' }, 500);
    }
};