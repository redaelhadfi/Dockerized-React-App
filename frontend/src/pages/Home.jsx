import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Container } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fullscreen Linear Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #1a237e, #ff5722)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* Header Section */}
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          Welcome to Our Platform
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
            fontWeight: 300,
          }}
        >
          Empowering your creativity and innovation. Join us today.
        </Typography>

        {/* Buttons Section */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/login"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/dashboard"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Dashboard
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
