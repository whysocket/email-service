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
        console.error('Error: Email environment variables (EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS) are not properly configured.');
        throw new Error('Email service variables are not configured.');
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });
};

const transporter = createTransporter();

export const sendEmailRoute = async (c: Context) => {
    if (!transporter) {
        return c.json({ error: 'Email service is not configured.' }, 500);
    }

    const body = await c.req.json();
    if (!body) {
        throw new Error('Request body is missing or invalid.');
    }

    const { to, subject, template } = body;
    const { name, data } = template;

    console.log(template)
    try {
        const emailsDir = getEmailsDirectory();
        const templatePath = path.join(emailsDir, `${name}.tsx`);

        let mod;
        try {
            mod = await import(templatePath);
        } catch (err: any) {
            if (err.code === 'ERR_MODULE_NOT_FOUND') {
                return c.json({ error: `Email template "${name}" not found` }, 404);
            }
            console.error('Error importing template:', err);
            return c.json({ error: 'Failed to load email template' }, 500);
        }

        const EmailComponent = mod.default;

        if (!EmailComponent) {
            return c.json({ error: `No default email component exported from "${name}"` }, 400);
        }

        const emailHtml = await render(React.createElement(EmailComponent, data));

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: emailHtml,
        });

        console.log('email sent')

        return c.json({ status: 'Email sent' });

    } catch (err) {
        console.error('Error processing email:', err);
        return c.json({ error: 'Failed to send email' }, 500);
    }
};