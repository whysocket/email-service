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

type ReviewerInterviewDatesEmailProps = {
  applicantFullName: string;
  proposedDatesUtc: Date[];
  observations: string;
};

const ReviewerInterviewDatesEmail = ({
  applicantFullName = 'Tutor Applicant',
  proposedDatesUtc = [],
  observations = 'No additional comments provided.',
}: ReviewerInterviewDatesEmailProps) => (
  <Html>
    <Head />
    <Preview>{applicantFullName} has suggested interview dates</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={heading}>
          {applicantFullName} has proposed interview dates
        </Heading>

        <Text style={text}>
          The tutor applicant has submitted new interview date options for your review.
        </Text>

        <Section style={dateList}>
          {proposedDatesUtc.length > 0 ? (
            proposedDatesUtc.map((date, index) => (
              <Text style={dateItem} key={index}>
                📅 {date.toUTCString()}
              </Text>
            ))
          ) : (
            <Text style={text}>No dates provided.</Text>
          )}
        </Section>

        {observations && (
          <>
            <Text style={{ ...text, fontWeight: 600 }}>Applicant Notes:</Text>
            <Text style={text}>{observations}</Text>
          </>
        )}

        <Text style={text}>
          Please confirm the date that works best for you in the dashboard.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>– The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default ReviewerInterviewDatesEmail;

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

const dateList = {
  marginBottom: '20px',
};

const dateItem = {
  fontSize: '16px',
  color: '#264653',
  marginBottom: '10px',
};

const hr = {
  borderColor: '#eeeeee',
  margin: '30px 0',
};

const footer = {
  fontSize: '14px',
  color: '#777777',
};
