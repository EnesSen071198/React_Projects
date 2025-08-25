import React from 'react';
import '../styles/Footer.css'
import { Container, Typography, Link, Box } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ marginBottom: '15px' }}>
          Bizi Takip Edin
        </Typography>
        <Box>
          <Link href="https://facebook.com" target="_blank" color="inherit" sx={{ marginRight: '15px' }}>
            <Facebook />
          </Link>
          <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ marginRight: '15px' }}>
            <Twitter />
          </Link>
          <Link href="https://instagram.com" target="_blank" color="inherit">
            <Instagram />
          </Link>
        </Box>
        <Typography variant="body2" sx={{ marginTop: '15px' }}>
          © 2024 Tüm Hakları Saklıdır | <Link href="/" color="inherit">Ana Sayfa</Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
