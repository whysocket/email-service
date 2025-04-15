import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type InterviewScheduledEmailProps = {
  applicantFullName: string;
  reviewerFullName: string;
  scheduledAtUtc: Date;
};

const InterviewScheduledEmail = ({
  applicantFullName = 'Tutor Applicant',
  reviewerFullName = 'Xceltutors Team Member',
  scheduledAtUtc = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
}: InterviewScheduledEmailProps) => (
  <Html>
    <Head />
    <Preview>Your interview has been scheduled with {reviewerFullName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          Interview Confirmed 🎉
        </Heading>

        <Text style={text}>
          Hi {applicantFullName},
        </Text>

        <Text style={text}>
          We're happy to let you know that your interview with <strong>{reviewerFullName}</strong> has been scheduled!
        </Text>

        <Text style={highlight}>
          📅 <strong>{scheduledAtUtc.toUTCString()}</strong> (UTC)
        </Text>

        <Text style={text}>
          Please ensure you're available and ready at this time. You'll receive more details about how to join the interview soon.
        </Text>

        <Text style={text}>
          If you have any questions, feel free to reach out to our team.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>– The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default InterviewScheduledEmail;

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

const highlight = {
  fontSize: '18px',
  color: '#264653',
  backgroundColor: '#F8F3E6',
  padding: '12px 20px',
  borderRadius: '6px',
  textAlign: 'center' as const,
  margin: '20px 0',
};

const hr = {
  borderColor: '#eeeeee',
  margin: '30px 0',
};

const footer = {
  fontSize: '14px',
  color: '#777777',
};
