import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Section } from '@react-email/section';

type OtpEmailProps = {
  otpCode: string;
  expirationUtc: Date;
  fullName: string;
};

const OtpEmail = ({
  fullName = 'User Member',
  otpCode = '000000',
  expirationUtc = new Date(Date.now() + 5 * 60 * 1000),
}: OtpEmailProps) => {
  const formattedExpiration = new Date(expirationUtc).toUTCString();
  return (
    <Html>
      <Head />
      <Preview>Your verification code for Xceltutors</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h2" style={heading}>
            Hello, {fullName} 👋
          </Heading>

          <Text style={text}>
            Use the following code to complete your login or verification process:
          </Text>

          <Section style={otpBoxWrapper}>
            <Text style={otpBox}>{otpCode}</Text>
          </Section>

          <Text style={text}>
            This code will expire at <strong>{formattedExpiration}</strong> (UTC).
          </Text>

          <Text style={text}>
            If you did not request this code, you can safely ignore this email.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>– The Xceltutors Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpEmail;

// --- Styles ---
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
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const heading = {
  fontSize: '22px',
  color: '#264653',
  marginBottom: '20px',
};

const text = {
  fontSize: '16px',
  color: '#333333',
  lineHeight: '1.5',
  marginBottom: '20px',
};

const otpBoxWrapper = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const otpBox = {
  display: 'inline-block',
  padding: '14px 28px',
  fontSize: '24px',
  letterSpacing: '4px',
  backgroundColor: '#F8F3E6',
  borderRadius: '6px',
  color: '#264653',
  fontWeight: 'bold' as const,
};

const hr = {
  borderColor: '#eeeeee',
  margin: '30px 0',
};

const footer = {
  fontSize: '14px',
  color: '#777777',
};
