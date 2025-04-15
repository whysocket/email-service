import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type TutorRejectionEmailProps = {
  fullName: string;
  rejectionReason: string;
};

const TutorRejectionEmail = ({
  fullName = 'Valued Applicant',
  rejectionReason = 'We felt your experience or qualifications were not the right fit at this time.',
}: TutorRejectionEmailProps) => (
  <Html>
    <Head />
    <Preview>Your tutor application at Xceltutors</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          Hello, {fullName}
        </Heading>

        <Text style={text}>
          Thank you for applying to become a tutor at Xceltutors. After carefully reviewing your application, we regret to inform you that we’re unable to move forward at this time.
        </Text>

        <Text style={text}>
          <strong>Reason:</strong> {rejectionReason}
        </Text>

        <Text style={text}>
          We sincerely appreciate your interest and encourage you to reapply in the future should circumstances change.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>– The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default TutorRejectionEmail;

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
