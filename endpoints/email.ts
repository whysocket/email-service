import { Context } from 'hono';
import { render } from '@react-email/components';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';
import React from 'react';
import path from 'path';
import { getEmailsDirectory } from '../utils/fileUtils';

// --- Basic Logger Implementation ---
const logger = {
    info: (message: string, ...args: any[]) => {
        console.info(`[INFO] ${new Date().toISOString()}: ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, ...args);
    },
    trace: (message: string, ...args: any[]) => {
         console.trace(`[TRACE] ${new Date().toISOString()}: ${message}`, ...args);
    },
};
// --- End Basic Logger Implementation ---

// --- Environment Enum ---
enum AppEnvironment {
    Development = 'development',
    Production = 'production',
    Staging = 'staging',
    Test = 'test',
}

const env: AppEnvironment = Object.values(AppEnvironment).includes(process.env.NODE_ENV as AppEnvironment)
    ? (process.env.NODE_ENV as AppEnvironment)
    : AppEnvironment.Development;

logger.info(`Application running in environment: ${env}`);
// --- End Environment Enum ---

// --- Email Sender Type Enum ---
enum EmailSenderType {
    Nodemailer = 'Nodemailer',
    Resend = 'Resend',
    // Add other types here if you introduce more senders
}
// --- End Email Sender Type Enum ---


// --- Strategy Pattern Interfaces and Implementations ---
interface SendEmailOptions {
    to: string[];
    subject: string;
    html: string;
    text?: string;
}

interface SendEmailResult {
    success: boolean;
    id?: string;
    error?: any;
    message?: string;
}

interface EmailSenderStrategy {
    send(options: SendEmailOptions): Promise<SendEmailResult>;
    // Change return type to the enum
    getSenderIdentifier(): EmailSenderType;
}

class NodemailerSenderStrategy implements EmailSenderStrategy {
    private transporter: nodemailer.Transporter;
    private fromAddress: string;

    constructor(transporter: nodemailer.Transporter, fromAddress: string) {
        this.transporter = transporter;
        this.fromAddress = fromAddress;
        logger.info('NodemailerSenderStrategy created.');
    }

    async send(options: SendEmailOptions): Promise<SendEmailResult> {
        logger.info('NodemailerSenderStrategy sending email...', { to: options.to, subject: options.subject });
        const mailOptions = {
            from: this.fromAddress,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger.info('Email sent via Nodemailer successfully.', { messageId: info.messageId });
            return {
                success: true,
                id: info.messageId,
                message: 'Email sent successfully via Nodemailer',
            };
        } catch (error) {
            logger.error('Failed to send email via Nodemailer:', error);
            logger.trace('Trace for Nodemailer send error.');
            return {
                success: false,
                error: error,
                message: 'Failed to send email via Nodemailer',
            };
        }
    }

    // Implement using the enum member
    getSenderIdentifier(): EmailSenderType {
        return EmailSenderType.Nodemailer;
    }
}

class ResendSenderStrategy implements EmailSenderStrategy {
    private resendClient: Resend;
    private fromAddress: string;

    constructor(resendClient: Resend, fromAddress: string) {
        this.resendClient = resendClient;
        this.fromAddress = fromAddress;
        logger.info('ResendSenderStrategy created.');
    }

    async send(options: SendEmailOptions): Promise<SendEmailResult> {
         logger.info('ResendSenderStrategy sending email...', { to: options.to, subject: options.subject });
        const emailOptions = {
            from: this.fromAddress,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        };

        try {
            const { data, error } = await this.resendClient.emails.send(emailOptions);

            if (error) {
                logger.error('Failed to send email via Resend:', error);
                logger.trace('Trace for Resend send API error.');
                 const errorDetail = typeof error === 'object' && error !== null ? JSON.stringify(error) : String(error);
                return {
                    success: false,
                    error: error,
                    message: `Failed to send email via Resend: ${errorDetail}`,
                };
            }

            logger.info('Email sent via Resend successfully.', { resendId: data?.id });
            return {
                success: true,
                id: data?.id,
                message: 'Email sent successfully via Resend',
            };
        } catch (error) {
            logger.error('An unexpected error occurred during Resend send:', error);
             logger.trace('Trace for unexpected Resend send failure.');
             return {
                success: false,
                error: error,
                 message: 'An unexpected error occurred during Resend send',
             };
        }
    }

    // Implement using the enum member
    getSenderIdentifier(): EmailSenderType {
        return EmailSenderType.Resend;
    }
}
// --- End Strategy Pattern Implementation ---


// --- Factory Function ---
const createEmailSenderStrategy = (currentEnv: AppEnvironment): EmailSenderStrategy | null => {
    const commonFromAddress = process.env.EMAIL_FROM;
    if (!commonFromAddress) {
         logger.error('FACTORY ERROR: Common sender email (EMAIL_FROM) is not configured.');
         return null;
    }

    try {
        if (currentEnv === AppEnvironment.Development) {
            const host = process.env.DEV_EMAIL_HOST;
            const port = process.env.DEV_EMAIL_PORT ? parseInt(process.env.DEV_EMAIL_PORT, 10) : undefined;
            const secure = process.env.DEV_EMAIL_SECURE === 'true';
            const user = process.env.DEV_EMAIL_USER;
            const pass = process.env.DEV_EMAIL_PASS;

            if (!host || port === undefined || user === undefined || pass === undefined) {
                 logger.error('FACTORY ERROR: Nodemailer development environment variables (DEV_EMAIL_HOST, DEV_EMAIL_PORT, DEV_EMAIL_USER, DEV_EMAIL_PASS) are not properly configured.');
                 logger.info('Ensure these variables are set for development.');
                 return null;
            }

            const transporter = nodemailer.createTransport({
                host, port, secure, auth: { user, pass },
            } as nodemailer.TransportOptions);

            transporter.verify((error, success) => {
                if (error) {
                    logger.error('Nodemailer transporter verification failed:', error);
                } else {
                    logger.info('Nodemailer transporter is ready (verified connection).');
                }
            });

            logger.info('FACTORY: Created NodemailerSenderStrategy for development using EMAIL_FROM.');
            return new NodemailerSenderStrategy(transporter, commonFromAddress);

        } else {
            const apiKey = process.env.RESEND_API_KEY;

            if (!apiKey) {
                logger.error(`FACTORY ERROR: Resend API_KEY environment variable is not set for ${currentEnv}.`);
                 return null;
            }

            const resendClient = new Resend(apiKey);
            logger.info(`FACTORY: Created ResendSenderStrategy for ${currentEnv} using EMAIL_FROM.`);
            return new ResendSenderStrategy(resendClient, commonFromAddress);
        }

    } catch (error) {
        logger.error('FACTORY ERROR: An unexpected error occurred during strategy creation:', error);
        logger.trace('FACTORY TRACE: Trace for unexpected strategy creation failure.');
        return null;
    }
};
// --- End Factory Function ---


// --- Application Initialization (Call the factory once) ---
const activeEmailSender: EmailSenderStrategy | null = createEmailSenderStrategy(env);

const initializationError: string | null = activeEmailSender
    ? null
    : `Failed to create email sender strategy for environment "${env}". Check logs for details.`;

if (initializationError) {
     logger.error(`Application startup error: ${initializationError}`);
} else {
     // Access enum value here
     logger.info(`Email service initialized with active sender: ${activeEmailSender?.getSenderIdentifier()}`);
}
// --- End Application Initialization ---


// --- Hono Route Handler (Client using the strategy) ---
export const sendEmailRoute = async (c: Context) => {
    if (!activeEmailSender) {
        logger.error('Email sender strategy was not successfully initialized at startup.');
        return c.json({ error: initializationError || 'Email service is not configured or failed to initialize.' }, 500);
    }

    // Access enum value here for logging
    const senderType = activeEmailSender.getSenderIdentifier();
    logger.info(`[${senderType}] Received incoming email request from ${c.req.path}`);

    try {
        const body = await c.req.json();
        if (!body) {
            logger.error(`[${senderType}] Request body is missing or invalid.`);
            logger.trace(`[${senderType}] Trace for missing request body error.`);
            return c.json({ error: 'Request body is missing or invalid.' }, 400);
        }

        const { to, subject, template } = body;

         if (!subject) {
             logger.error(`[${senderType}] "subject" field is missing or empty.`);
             return c.json({ error: '"subject" field is missing or empty.' }, 400);
         }

         if (!template || typeof template.name !== 'string') {
             logger.error(`[${senderType}] Template object or template name is missing/invalid in body.`);
             logger.trace(`[${senderType}] Trace for invalid template in body.`);
             return c.json({ error: 'Template object or template name is missing/invalid.' }, 400);
         }

        const { name, data } = template;

        let recipientEmails: string[];
        if (typeof to === 'string') {
             recipientEmails = [to];
        } else if (Array.isArray(to) && to.every(item => typeof item === 'string')) {
             recipientEmails = to;
        } else {
             logger.error(`[${senderType}] Invalid "to" field type: ${typeof to}. Expected string or array of strings.`);
             logger.trace(`[${senderType}] Trace for invalid "to" field type.`);
             return c.json({ error: '"to" field must be a string or array of strings.' }, 400);
        }

         if (recipientEmails.length === 0) {
             logger.error(`[${senderType}] "to" field is empty.`);
             return c.json({ error: '"to" field must not be empty.' }, 400);
         }

        logger.info(`[${senderType}] Processing email request: To=${recipientEmails.join(', ')}, Subject="${subject}", Template=${name}`);


        const emailsDir = getEmailsDirectory();
        const templatePath = path.join(emailsDir, `${name}.tsx`);
        logger.info(`[${senderType}] Attempting to load email template from: ${templatePath}`);

        let mod;
        try {
             mod = await import(templatePath);
            logger.info(`[${senderType}] Successfully imported email template: ${name}`);
        } catch (err: any) {
            if (err.code === 'MODULE_NOT_FOUND' || err.code === 'ERR_MODULE_NOT_FOUND') {
                logger.error(`[${senderType}] Email template "${name}" not found at path: ${templatePath}`, err);
                logger.trace(`[${senderType}] Trace for template not found error: ${templatePath}`);
                return c.json({ error: `Email template "${name}" not found` }, 404);
            }
            logger.error(`[${senderType}] Failed to import email template:`, err);
            logger.trace(`[${senderType}] Trace for failed template import.`);
            const importError = err instanceof Error ? err.message : String(err);
            return c.json({ error: 'Failed to load email template', detail: importError }, 500);
        }

        const EmailComponent = mod.default;

        if (!EmailComponent) {
            logger.error(`[${senderType}] No default email component exported from "${name}" at path: ${templatePath}`);
            logger.trace(`[${senderType}] Trace for no default export in template: ${templatePath}`);
            return c.json({ error: `No default email component exported from "${name}"` }, 400);
        }

        logger.info(`[${senderType}] Rendering email template "${name}" with data:`, data);

        let emailHtml: string;
        try {
            emailHtml = await render(React.createElement(EmailComponent, data));
            logger.info(`[${senderType}] Email template rendered successfully.`);
        } catch (renderErr) {
            logger.error(`[${senderType}] Failed to render email template "${name}"`, renderErr);
            logger.trace(`[${senderType}] Trace for template rendering failure.`);
             const renderErrorDetail = renderErr instanceof Error ? renderErr.message : String(renderErr);
            return c.json({ error: 'Failed to render email template', detail: renderErrorDetail }, 500);
        }

        const sendOptions: SendEmailOptions = {
            to: recipientEmails,
            subject: subject,
            html: emailHtml,
        };

        // Use the active sender strategy
        const sendResult = await activeEmailSender.send(sendOptions);

        if (!sendResult.success) {
            logger.error(`[${senderType}] Email sending failed.`, sendResult.error);
            const errorDetail = sendResult.error instanceof Error ? sendResult.error.message : JSON.stringify(sendResult.error);
             return c.json({
                error: sendResult.message || 'Failed to send email',
                detail: errorDetail
            }, 500);
        }

        logger.info(`[${senderType}] Email sent successfully. ID: ${sendResult.id}`);

        return c.json({
            status: `Email sent via ${senderType}`, // Use enum value in response
            id: sendResult.id
        });

    } catch (err) {
        // Use senderType if available, otherwise 'Unknown Sender'
        const currentSenderType = activeEmailSender?.getSenderIdentifier() || 'Unknown Sender';
        logger.error(`[${currentSenderType}] An unexpected error occurred while processing the email:`, err);
        logger.trace(`[${currentSenderType}] Trace for unexpected error in email processing.`);
        const unexpectedErrorDetail = err instanceof Error ? err.message : String(err);
        return c.json({ error: 'An unexpected error occurred while trying to send the email.', detail: unexpectedErrorDetail }, 500);
    } finally {
         // Use senderType if available, otherwise 'Unknown Sender'
        const currentSenderType = activeEmailSender?.getSenderIdentifier() || 'Unknown Sender';
        logger.info(`[${currentSenderType}] Finished processing email request.`);
    }
};