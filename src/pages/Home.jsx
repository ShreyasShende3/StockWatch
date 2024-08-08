import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-scroll';

const Home = () => {
  return (
    <Container sx={{ paddingTop: '200px', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '40px', color: '#1e1e1e', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
        StockWatch : Real-Time Stock Tracking Tool
      </Typography>
      
      <Box sx={{ marginBottom: '40px' }}>
        <Typography variant="h6" component="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Technologies Used
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <img src="Arch_Amazon-API-Gateway_64.png" alt="API Gateway" title="API Gateway" style={{ maxWidth: '100px', height: 'auto' }} />
          <img src="Arch_Amazon-DynamoDB_64.png" alt="DynamoDB" title="DynamoDB" style={{ maxWidth: '100px', height: 'auto' }} />
          <img src="Arch_Amazon-EventBridge_64.png" alt="EventBridge" title="EventBridge" style={{ maxWidth: '100px', height: 'auto' }} />
          <img src="Arch_Amazon-Simple-Notification-Service_64.png" alt="SNS" title="SNS" style={{ maxWidth: '100px', height: 'auto' }} />
          <img src="Arch_AWS-Amplify_64.png" alt="Amplify" title="Amplify" style={{ maxWidth: '100px', height: 'auto' }} />
          <img src="Arch_AWS-Lambda_64.png" alt="Lambda" title="Lambda" style={{ maxWidth: '100px', height: 'auto' }} />
        </Box>
      </Box>

      <Typography variant="body1" sx={{ marginBottom: '60px', fontSize: '18px', color: '#333', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
        This project is a comprehensive stock monitoring tool that allows users to track stock prices and manage their preferences. Users can receive alerts to their email ids when stock prices meet their desired criteria, providing timely notifications to make informed decisions. The entire backend project is based on AWS cloud services, including Amazon Amplify, Lambda, and DynamoDB. The frontend is built using React and Material-UI components.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: '100px', paddingTop: '50px' }}>
        <Link to="architecture" smooth={true} duration={500} offset={-70}>
          <Button variant="contained" color="primary" sx={buttonStyle}>
            View Architecture
          </Button>
        </Link>
        <Link to="how-to-use" smooth={true} duration={500} offset={-70}>
          <Button variant="contained" color="secondary" sx={buttonStyle}>
            How to Use
          </Button>
        </Link>
      </Box>

      <Box id="architecture" sx={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Project Architecture
        </Typography>
        <img src="StockWatch_Arch (1).png" alt="Architecture Diagram" style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', padding: '10px' }} />
      </Box>
      
      <Box id="how-to-use" sx={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          How to Use This Project
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '16px', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          Using this project is very easy, follow the below steps:
          <ol style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
            <li>Go to <strong>Preferences</strong> and select the Stock that you would like to set along with purchase price and sell %.</li>
            <li>Then click on <strong>Save Preferences</strong>.</li>
            <li>Click on the button just to the left of it, titled <strong>'Subscribe to Tracker'</strong>.</li>
            <li>You are done! But if you want to check historical prices of the stocks or catch some latest news related to it, go to the <strong>Stocks</strong> section and just choose the stock.</li>
          </ol>
        </Typography>
      </Box>
    </Container>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#444',
  },
};

export default Home;
