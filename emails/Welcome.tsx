import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import React from 'react';

type WelcomeEmailProps = {
    FullName: string;
};

export const WelcomeEmail = ({ FullName = "User Member" }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to our platform, {FullName}!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading as="h1" style={heading}>
                    Welcome, {FullName} 👋
                </Heading>
                <Text style={text}>
                    We're excited to have you on board. Whether you're here to learn, share, or grow, you've come to the right place.
                </Text>
                <Text style={text}>
                    If you have any questions or need help getting started, don't hesitate to reach out. We're here for you!
                </Text>
                <Hr style={hr} />
                <Text style={footer}>– The Team</Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

// Styles
const main = {
    backgroundColor: '#f9f9f9',
    padding: '40px 0',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '600px',
    fontFamily: 'Arial, sans-serif',
};

const heading = {
    fontSize: '24px',
    marginBottom: '20px',
};

const text = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333333',
    marginBottom: '20px',
};

const hr = {
    borderColor: '#eeeeee',
    margin: '20px 0',
};

const footer = {
    fontSize: '14px',
    color: '#777777',
};

