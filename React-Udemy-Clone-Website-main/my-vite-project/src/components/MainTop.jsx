import "../styles/MainTop.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Carousel from "react-bootstrap/Carousel";
import MainTopImage1 from "../assets/main-top-image-1.png";
import MainTopImage2 from "../assets/main-top-image-2.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // FontAwesome iconları
import "../styles/MainTop.css";
const MainTop = () => {
  return (
    <div className='main-top-container'>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginLeft: "-20px"
        }}>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 70, height: 70 }}
          alt='Enes Şen'
          src='/static/images/avatar/1.jpg'
        />
        <Stack direction='column' spacing={1}>
          <h3 className='main-top-title'>Tekrar hoş geldiniz, Enes</h3>
          <p className='main-top-subtitle'>
            Manager, Yazılım Geliştirme{" "}
            <Button
              className='main-top-button'
              sx={{
                textDecoration: "underline",
                color: " #6d28da",
                textTransform: "none"
              }}>
              Mesleğini ve ilgi alanlarını düzenle
            </Button>
          </p>
        </Stack>
      </Stack>

      <Carousel
        className='carousel-container'
        nextIcon={<FaChevronRight className='carousel-button-icon' />}
        prevIcon={<FaChevronLeft className='carousel-button-icon' />}>
        <Carousel.Item>
          <img src={MainTopImage1} alt='First slide' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={MainTopImage2} alt='Second slide' />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={MainTopImage1} alt='Third slide' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainTop;
