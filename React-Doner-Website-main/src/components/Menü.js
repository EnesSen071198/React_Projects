import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import Döner1 from '../images/1.png';
import Döner2 from '../images/2.jpg';
import Döner3 from '../images/3.jpg';
import Döner4 from '../images/1.png';
import Döner5 from '../images/3.jpg';
import Döner6 from '../images/1.png';
// Daha fazla döner fotoğrafı ekleyebilirsiniz
import '../styles/Menu.css';

export const Menü = () => {
  const menuItems = [
    { title: 'Et Döner', price: '50₺', description: 'Lezzetli et döner, taze sebzeler ve özel soslarla servis edilir.', image: Döner1 },
    { title: 'Tavuk Döner', price: '40₺', description: 'Özel baharatlarla marine edilmiş tavuk döner, çıtır patates ve soğan halkası ile.', image: Döner2 },
    { title: 'Karışık Döner', price: '60₺', description: 'Et ve tavuk dönerin muhteşem karışımı, yanında soslu patates ve taze salata.', image: Döner3 },
    { title: 'İskender Döner', price: '75₺', description: 'Dilimlenmiş döner, yoğurt, domates sosu ve tereyağı ile.', image: Döner4 },
    { title: 'Dürüm Döner', price: '45₺', description: 'Taze lavaş ekmeği içerisinde sarılmış et döner, yanında acılı sos.', image: Döner5 },
    { title: 'Döner Pilav Üstü', price: '55₺', description: 'Nefis et döner, tereyağlı pilav ve mevsim salatası ile.', image: Döner6 },
    { title: 'Dublex Döner', price: '90₺', description: 'Çift porsiyon et döner, yanında patates kızartması ve bolca sos.', image: Döner1 },
    { title: 'Tavuk İskender', price: '70₺', description: 'Tavuk dönerin yoğurt ve sosla buluştuğu İskender spesiyali.', image: Döner2 },
    { title: 'Döner Tabak', price: '65₺', description: 'Bol et döner, yanında pilav ve közlenmiş biber.', image: Döner3 },
    { title: 'Çıtır Tavuk Döner', price: '50₺', description: 'Çıtır çıtır tavuk döner, bol soslu patates ve mevsim salatası ile.', image: Döner4 },
    { title: 'Tereyağlı Et Döner', price: '80₺', description: 'Tereyağında pişirilmiş özel et döner, pilav ve közlenmiş sebzeler.', image: Döner5 },
    { title: 'Mega Tavuk Döner', price: '55₺', description: 'Çift porsiyon tavuk döner, taze patates kızartması ve özel sos.', image: Döner6 },
    { title: 'Lavaşta Döner', price: '45₺', description: 'Sıcak lavaş içerisinde et döner, yanında taze salata ve soğan.', image: Döner1 },
    { title: 'Kaşarlı Dürüm', price: '50₺', description: 'Kaşarlı tavuk döner, taze lavaş içerisinde sarılmış.', image: Döner2 },
    { title: 'Acılı Et Döner', price: '60₺', description: 'Acı severler için özel acılı et döner, yanında közlenmiş biber.', image: Döner3 },
    { title: 'Pide Üstü Döner', price: '75₺', description: 'Pide üzerinde sunulan et döner, yanında yoğurt ve tereyağı.', image: Döner4 },
    { title: 'Çocuk Menü', price: '35₺', description: 'Küçük porsiyon tavuk döner, patates kızartması ve içecek ile.', image: Döner5 },
    { title: 'Sebzeli Döner', price: '65₺', description: 'Sebzelerle harmanlanmış sağlıklı et döner.', image: Döner6 },
    { title: 'Yoğurtlu Döner', price: '70₺', description: 'Yoğurt sosu ile servis edilen hafif ve lezzetli döner.', image: Döner1 },
    { title: 'Spesiyal Döner', price: '85₺', description: 'Şefin özel tarifi ile hazırlanmış döner, yanında taze garnitürler.', image: Döner2 },
    { title: 'Karışık Döner', price: '100₺', description: 'Şefin özel tarifi ile hazırlanmış döner, yanında taze garnitürler.', image: Döner1 },

  ];

  return (
    <Container className="menu-container" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Menümüz
      </Typography>
      <Grid container spacing={4}>
        {menuItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className="menu-card">
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
                  {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Menü;
