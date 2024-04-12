import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';
import React from 'react';

// EmailTemplate component
const EmailTemplate = ({ body }) => (
  <Html>
    {/* Email head */}
    <Head />
    {/* Email preview */}
    <Preview>
      The Ecommerce Platform For Your Digital Products. Search now for your future.
    </Preview>
    {/* Email body */}
    <Body style={main}>
      {/* Container for email content */}
      <Container style={container}>
        {/* Logo */}
        <Img
          src='https://res.cloudinary.com/dtcfyow8s/image/upload/v1712461934/go_5a72a9961f.jpg'
          width="420"
          height="300"
          alt="Koala"
          style={logo}
        />
        {/* Greeting */}
        <Text style={paragraph}>Hi {body.fullName},</Text>
        {/* Thank you message */}
        <Text style={paragraph}>
          Thank you for purchasing on Easy Learn marketplace. Click on the download button below to download all digital content.
        </Text>
        {/* Download button */}
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href='https://res.cloudinary.com/dtcfyow8s/image/upload/v1712461934/go_5a72a9961f.jpg'>
            Download
          </Button>
        </Section>
        {/* Closing message */}
        <Text style={paragraph}>
          Best,<br />
          The Easy Learn team
        </Text>
        {/* Horizontal line */}
        <Hr style={hr} />
        {/* Footer */}
        <Text style={footer}>Subscribe to Easy Learn</Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};

export default EmailTemplate;
