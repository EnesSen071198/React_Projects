import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import '../styles/AboutUs.css';

export const AboutUs = () => {
  return (
    <Container className="about-container" maxWidth="lg">
      <Box className="about-section" sx={{ marginTop: '40px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Hakkımızda
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Gurme Dönerci olarak 1995 yılından bu yana, geleneksel Türk mutfağının en sevilen lezzetlerinden biri olan döneri, modern dokunuşlarla müşterilerimize sunuyoruz. Lezzet yolculuğumuza başladığımız ilk günden beri, tazelik, kalite ve müşteri memnuniyetini her zaman ön planda tuttuk. Bugün geldiğimiz noktada, döner denildiğinde akla gelen ilk markalardan biri olmanın gururunu yaşıyoruz.
        </Typography>
      </Box>

      <Divider />

      <Box className="vision-section" sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Vizyonumuz
        </Typography>
        <Typography variant="body1" align="center" paragraph>
        Gurme Dönerci olarak, yalnızca Türkiye’de değil, dünya genelinde döner lezzetini tanıtmayı hedefliyoruz. Kaliteden ödün vermeden, sürekli yenilikçi yaklaşımımızla dönerin global arenada tanınan bir lezzet olmasını sağlamak için çalışıyoruz. Amacımız, döneri dünya mutfağında hak ettiği yere taşımak.
        </Typography>
      </Box>

      <Divider />

      <Box className="mission-section" sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Misyonumuz
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Müşterilerimize en kaliteli ve lezzetli döner çeşitlerini sunmayı ilke edindik. Tazelikten ve hijyenden asla taviz vermeden, dönerimizi her zaman en iyi malzemelerle hazırlıyoruz. Amacımız, her misafirimize en iyi hizmeti sunarak, döner deneyimini unutulmaz kılmak. Misyonumuz, dönerin yerel bir lezzetten küresel bir marka haline gelmesini sağlamak.
        </Typography>
      </Box>

      <Divider />

      <Box className="success-section" sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Başarılarımız
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          25 yılı aşkın süredir hizmet veren Dönerci Ustası, sayısız ödüle layık görüldü. 2015 yılında "En İyi Dönerci" ödülünü kazandık ve sektördeki öncülüğümüzü sürdürmeye devam ediyoruz. Her yıl artan müşteri memnuniyeti oranımız ve yerel ile global çapta büyüyen şube ağımızla, döner lezzetini her geçen gün daha fazla insana ulaştırıyoruz.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
