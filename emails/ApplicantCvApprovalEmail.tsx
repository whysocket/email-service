import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type ApplicantCvApprovalEmailProps = {
  applicantFullName?: string;
  reviewerFullName?: string;
};

const ApplicantCvApprovalEmail = ({
  applicantFullName = 'John Doe',
  reviewerFullName = 'Jane Reviewer',
}: ApplicantCvApprovalEmailProps) => (
  <Html>
    <Head />
    <Preview>Your CV has been approved — please select your interview time</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          Hello {applicantFullName},
        </Heading>

        <Text style={text}>
          Great news — your CV has been reviewed and approved by the Xceltutors team!
        </Text>

        <Text style={text}>
          You’ve been assigned to <strong>{reviewerFullName}</strong> for your upcoming interview.
        </Text>

        <Text style={text}>
          Please log in to your Xceltutors account and select an interview time from the availability provided by your reviewer.
        </Text>

        <Text style={text}>
          We’re excited to move forward with your application and look forward to meeting you soon.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>— The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default ApplicantCvApprovalEmail;

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
