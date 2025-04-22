import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type ApplicantCvRejectionEmailProps = {
  applicantFullName?: string;
  rejectionReason?: string;
};

const ApplicantCvRejectionEmail = ({
  applicantFullName = 'John Doe',
  rejectionReason = 'Your application did not meet our current requirements.',
}: ApplicantCvRejectionEmailProps) => (
  <Html>
    <Head />
    <Preview>{`Update on your Xceltutors application`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          Hello {applicantFullName},
        </Heading>

        <Text style={text}>
          Thank you for your recent application to become a tutor with Xceltutors. We truly appreciate the time and effort you put into preparing your submission.
        </Text>

        <Text style={text}>
          After careful review, we regret to inform you that we are unable to proceed with your application at this time.
        </Text>

        {rejectionReason && (
          <Text style={text}>
            <strong>Reason:</strong> {rejectionReason}
          </Text>
        )}

        <Text style={text}>
          Your account has been removed from our system. However, you're more than welcome to reapply in the future should your experience or qualifications change — we’d love to hear from you again.
        </Text>

        <Text style={text}>
          We wish you all the best in your future endeavors, and thank you again for your interest in Xceltutors.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>— The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default ApplicantCvRejectionEmail;

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

const hr = {
  borderColor: '#eeeeee',
  margin: '30px 0',
};

const footer = {
  fontSize: '14px',
  color: '#777777',
};
