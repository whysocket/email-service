import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Button } from '@react-email/button';
import { Section } from '@react-email/section';

type WelcomeEmailProps = {
  fullName: string;
};

const WelcomeEmail = ({ fullName = 'User Member' }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Xceltutors, {fullName} — Let's get started!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading as="h1" style={heading}>
            Welcome to Xceltutors, {fullName}! 🎉
          </Heading>
        </Section>

        <Text style={text}>
          We’re thrilled to have you in the Xceltutors learning community. Your journey toward academic excellence begins now.
        </Text>

        <Text style={text}>
          Here's what you can do next to get started:
        </Text>

        {/* Feature List */}
        <Section style={featureList}>
          {features.map((feature, index) => (
            <Container key={index} style={featureItem}>
              <div style={featureIcon}>{index + 1}</div>
              <Heading as="h3" style={featureTitle}>{feature.title}</Heading>
              <Text style={featureText}>{feature.description}</Text>
            </Container>
          ))}
        </Section>

        {/* Call-to-action */}
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
            <Button
                href="#"
                style={{
                    backgroundColor: '#2A9D8F',
                    color: '#ffffff',
                    fontSize: '16px',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    padding: '12px 24px',
                    display: 'inline-block',
                    fontWeight: '500',
                }}
                >
                Get Started Now
            </Button>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          Need help? Our support team is always here to help you succeed.
        </Text>

        <Text style={footer}>– The Xceltutors Team</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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

const header = {
  backgroundColor: '#2A9D8F',
  padding: '20px',
  borderRadius: '6px',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '26px',
  color: '#ffffff',
  margin: 0,
};

const text = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#333333',
  margin: '20px 0',
};

const hr = {
  borderColor: '#eeeeee',
  margin: '30px 0',
};

const button = {
  backgroundColor: '#2A9D8F',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  borderRadius: '4px',
};

const footer = {
  fontSize: '14px',
  color: '#777777',
  marginTop: '20px',
};

const featureList = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
  marginTop: '20px',
};

const featureItem = {
  border: '1px solid #eeeeee',
  padding: '20px',
  borderRadius: '6px',
};

const featureIcon = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#F8F3E6',
  color: '#E9C46A',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
};

const featureTitle = {
  fontSize: '16px',
  color: '#264653',
  margin: '0 0 8px 0',
};

const featureText = {
  fontSize: '14px',
  color: '#555555',
  margin: 0,
};

// --- Data ---
const features = [
  {
    title: 'Complete Your Profile',
    description: 'Add your learning preferences and academic goals.',
  },
  {
    title: 'Browse Courses',
    description: 'Explore our catalog of expert-led courses and tutorials.',
  },
  {
    title: 'Schedule a Session',
    description: 'Book your first tutoring session with one of our experts.',
  },
];
