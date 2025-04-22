import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';

type ApplicantAssignedToReviewerEmailProps = {
    reviewerFullName?: string;
    applicantFullName?: string;
};

const ApplicantAssignedToReviewerEmail = ({
    reviewerFullName = 'Jane Reviewer',
    applicantFullName = 'John Applicant',
}: ApplicantAssignedToReviewerEmailProps) => (
    <Html>
        <Head />
        <Preview>{`New applicant assigned: ${applicantFullName}`}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading as="h2" style={heading}>
                    Hello {reviewerFullName},
                </Heading>

                <Text style={text}>
                    A new applicant has been assigned to you for interview as part of the Xceltutors onboarding process.
                </Text>

                <Text style={text}>
                    <strong>Applicant Name:</strong> {applicantFullName}
                </Text>

                <Text style={text}>
                    Please log in to your reviewer dashboard to propose suitable interview times for the applicant. Once you propose dates, the applicant will choose a time that works for them.
                </Text>

                <Text style={text}>
                    Thank you for supporting the tutor onboarding process.
                </Text>

                <Hr style={hr} />
                <Text style={footer}>— The Xceltutors Team</Text>
            </Container>
        </Body>
    </Html>
);

export default ApplicantAssignedToReviewerEmail;

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
