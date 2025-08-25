import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import '../styles/Contact.css';

export const Contact = () => {
  return (
    <Container className="contact-container" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        İletişim
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Sorularınız ve önerileriniz için bizimle iletişime geçebilirsiniz. Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box className="contact-info">
            <Typography variant="h6">Adres</Typography>
            <Typography variant="body2">123 Döner Sokak, Dönerci Mahallesi, İstanbul</Typography>
          </Box>
          <Box className="contact-info">
            <Typography variant="h6">Telefon</Typography>
            <Typography variant="body2">+90 555 555 5555</Typography>
          </Box>
          <Box className="contact-info">
            <Typography variant="h6">E-posta</Typography>
            <Typography variant="body2">info@dönerciustası.com</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <form className="contact-form">
            <TextField
              fullWidth
              label="Adınız"
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="E-posta"
              margin="normal"
              variant="outlined"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Mesajınız"
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: '20px' }}
            >
              Gönder
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
