import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import MainPhoto from '../images/4.jpg'; // Ana sayfa için görsel
import '../styles/Home.css';

export const Home = () => {
  return (
    <Box className="home" style={{ backgroundImage: `url(${MainPhoto})` }}>
      <Container className="home-content">
        <Typography variant="h2" align="center" className="home-title" data-aos="fade-up">
          Gurme Döner
        </Typography>
        <Typography variant="h5" align="center" className="home-subtitle" paragraph data-aos="fade-up" data-aos-delay="200">
          Geleneksel lezzetin modern dokunuşlarla buluştuğu adres. Dönerin en tazesi, en lezzetlisi burada.
        </Typography>
        <Link to="/Menü" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="order-button"
            sx={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#007BFF',
              ':hover': {
                backgroundColor: '#0056b3',
              },
            }}
            data-aos="fade-up" data-aos-delay="400"
          >
            Sipariş Ver
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Home;
