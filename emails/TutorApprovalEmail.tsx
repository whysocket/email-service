import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type TutorApprovalEmailProps = {
  fullName: string;
};

const TutorApprovalEmail = ({
  fullName = 'New Tutor',
}: TutorApprovalEmailProps) => (
  <Html>
    <Head />
    <Preview>You've been approved as a tutor on Xceltutors!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          Welcome aboard, {fullName}! 🎉
        </Heading>

        <Text style={text}>
          We're excited to let you know that your application to become a tutor at Xceltutors has been approved!
        </Text>

        <Text style={text}>
          You now have access to your tutor dashboard where you can set up your services, update your profile, and start connecting with students.
        </Text>

        <Text style={text}>
          We’re thrilled to have you on the team and can’t wait to see the impact you’ll make.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>– The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default TutorApprovalEmail;

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
