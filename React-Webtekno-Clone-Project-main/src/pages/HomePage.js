import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainData from "../data/MainData";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import fetchData from "../data/Data";
import { FaCamera, FaWifi } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

function HomePage() {
  const [api, setApi] = useState([]);

  useEffect(() => {
    const getApiData = async () => {
      const ApiData = await fetchData();
      setApi(ApiData);
    };
    getApiData();
  }, []);

  const navigate = useNavigate();

  // Yönlendirme fonksiyonu
  const handleContentClick = (path) => {
    navigate(path); // Yönlendirme işlemi
  };
  const cardStyle = {
    position: "relative",
    width: "100%",
    height: "270px", // Kartın tüm ekranı kaplamasını sağlar
    overflow: "hidden", // Resim taşarsa gizler
    cursor: "pointer",
    border: "none"
  };

  const textOverlayStyle = {
    position: "absolute",
    bottom: "10px",
    left: "5px",
    color: "white",
    fontSize: "1.5em",
    padding: "10px",
    width: "100%" // Başlık genişliğini ayarlar
  };

  const imgStyle = {
    objectFit: "cover", // Görselin tüm alanı kaplamasını sağlar
    height: "100%", // Resmin yüksekliği kartın yüksekliğine eşit olur
    width: "100%" // Resmin genişliği kartın genişliğine eşit olur
  };

  const row = {
    display: "flex",
    marginTop: "calc(-1 * var(--bs-gutter-y))",
    marginRight: "calc(-1.1 * var(--bs-gutter-x))",
    marginLeft: "calc(-0.1 * var(--bs-gutter-x))",
    flexWrap: "wrap"
  };
  return (
    <Container fluid style={{ padding: "0", overflow: "hidden" }}>
      <Row style={row}>
        {/* İlk Kol: Card 1 */}
        <Col
          xs={12}
          sm={6}
          md={6}
          className='mb-1'
          style={{ marginRight: "-10px" }}>
          <Card style={cardStyle} onClick={() => handleContentClick("Page1")}>
            {/* Kart Resmi */}
            <Card.Img variant='top' src={MainData[0].image} style={imgStyle} />

            <Card.Body style={textOverlayStyle}>
              {/* Kategori Kutusu */}
              <div
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px 7px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "-20px",
                  left: "10px",
                  zIndex: "10"
                }}>
                Haber
              </div>
              <Card.Title>{MainData[0].title}</Card.Title>

              {/* Yazar ve Saat Bilgisi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "7px",
                  color: "gray",
                  fontSize: "12px"
                }}>
                <span style={{ marginRight: "8px" }}>Enes Şen</span>
                <FaRegClock
                  size={14}
                  color='gray'
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                />
                <span>2 saat önce</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* İkinci Kol: Card 2 */}
        <Col
          xs={12}
          sm={6}
          md={3}
          className='mb-1'
          style={{ marginRight: "-15px" }}>
          <Card style={cardStyle} onClick={() => handleContentClick("Page2")}>
            <Card.Img variant='top' src={MainData[1].image} style={imgStyle} />
            <Card.Body style={textOverlayStyle}>
              <div
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px 7px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "-20px",
                  left: "10px",
                  zIndex: "10"
                }}>
                Teknoloji
              </div>
              <Card.Title>{MainData[1].title}</Card.Title>
              {/* Yazar ve Saat Bilgisi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                  color: "gray",
                  fontSize: "12px"
                }}>
                <span style={{ marginRight: "8px" }}>Enes Şen</span>
                <FaRegClock
                  size={14}
                  color='gray'
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                />
                <span>2 saat önce</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Üçüncü Kol: Card 3 ve Card 4 üst üste */}
        <Col xs={12} sm={6} md={3} className='mb-1'>
          <Card
            style={{ ...cardStyle, height: "130px" }}
            className='mb-3'
            onClick={() => handleContentClick("Page3")}>
            <Card.Img
              variant='top'
              src={MainData[2].image}
              style={{ ...imgStyle }}
            />
            <Card.Body style={textOverlayStyle}>
              <div
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px 7px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "-15px",
                  left: "10px",
                  zIndex: "10"
                }}>
                Teknoloji
              </div>
              <Card.Title style={{ fontSize: "17px" }}>
                {MainData[2].title}
              </Card.Title>
              {/* Yazar ve Saat Bilgisi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "-5px",
                  marginBottom: "-10px",
                  color: "gray",
                  fontSize: "12px"
                }}>
                <span style={{ marginRight: "8px" }}>Enes Şen</span>
                <FaRegClock
                  size={14}
                  color='gray'
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                />
                <span>2 saat önce</span>
              </div>
            </Card.Body>
          </Card>

          <Card
            style={{ ...cardStyle, height: "130px" }}
            onClick={() => handleContentClick("Page4")}>
            <Card.Img
              variant='top'
              src={MainData[3].image}
              style={{ ...imgStyle, height: "120px" }}
            />
            <Card.Body style={textOverlayStyle}>
              <div
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px 7px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "-15px",
                  left: "10px",
                  zIndex: "10"
                }}>
                Haber
              </div>
              <Card.Title style={{ fontSize: "17px" }}>
                {MainData[3].title}
              </Card.Title>
              {/* Yazar ve Saat Bilgisi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "-5px",
                  marginBottom: "-10px",
                  color: "gray",
                  fontSize: "12px"
                }}>
                <span style={{ marginRight: "8px" }}>Enes Şen</span>
                <FaRegClock
                  size={14}
                  color='gray'
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                />
                <span>2 saat önce</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='justify-content-md-center'>
        <Col xs lg='6'>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px", // Başlık ile kartlar arasına boşluk
              marginTop: "10px"
            }}>
            <h3
              style={{
                fontWeight: "bold", // Kalın yazı
                color: "#FF5722", // Başlık rengi
                margin: "0", // Ekstra boşlukları kaldır
                fontSize: "1.25em",
                marginTop: "10px"
              }}>
              Yayın Akışı
            </h3>
            <FaWifi
              size={23}
              color='gray'
              style={{
                marginLeft: "10px",
                transform: "rotate(45deg)" // 45 derece döndürme
              }}
            />
          </div>

          {api.map((item, index) => (
            <div style={{ position: "relative" }} key={index}>
              <FaCamera
                size={24}
                color='#ff9800'
                style={{
                  position: "absolute",
                  left: "-50px",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-62px",
                  top: "72%",
                  transform: "translateY(-50%)",
                  fontSize: "10px",
                  color: "gray",
                  textAlign: "center"
                }}>
                2 saat önce
              </span>
              <Card
                style={{ ...cardStyle, height: "120px", marginBottom: "10px" }}>
                <Card.Img
                  variant='top'
                  src={item.image}
                  style={{
                    ...imgStyle,
                    height: "140px",
                    width: "220px",
                    wordWrap: "break-word"
                  }}
                />
                <Card.Body
                  style={{
                    ...textOverlayStyle,
                    left: "220px",
                    backgroundColor: "none",
                    color: "black",
                    textTransform: "capitalize"
                  }}>
                  <div
                    style={{
                      color: "gray",
                      padding: "5px 10px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      position: "absolute",
                      top: "-25px",
                      left: "0px",
                      zIndex: "10"
                    }}>
                    Spor
                  </div>
                  {/* Yazıyı 15 karakterle sınırlama */}
                  <Card.Title
                    style={{
                      wordWrap: "break-word", // Satır sonu yapmasına izin ver
                      whiteSpace: "normal", // Taşma yerine satır sonu ekle
                      fontSize: "15px"
                    }}>
                    {item.title.length > 60
                      ? item.title.substring(0, 60) + "..."
                      : item.title}
                  </Card.Title>
                  {/* Yazar ve Saat Bilgisi */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginTop: "10px",
                      color: "gray",
                      fontSize: "12px"
                    }}>
                    <span style={{ marginRight: "8px" }}>Enes Şen</span>
                    <FaRegClock
                      size={14}
                      color='gray'
                      style={{ marginRight: "6px", verticalAlign: "middle" }}
                    />
                    <span>2 saat önce</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>

        <Col xs lg='2'>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px", // Başlık ile kartlar arasına boşluk
              marginTop: "10px"
            }}>
            <h3
              style={{
                fontWeight: "bold", // Kalın yazı
                color: "#FF5722", // Başlık rengi
                margin: "0  ", // Ekstra boşlukları kaldır
                fontSize: "1.25em"
              }}>
              Trend Videolar
            </h3>
          </div>

          {api.map((item, index) => (
            <div style={{ position: "relative" }} key={index}>
              <Card
                style={{
                  ...cardStyle,
                  height: "auto",
                  marginBottom: "-25px",
                  border: "none"
                }}>
                <Card.Img
                  variant='top'
                  src={item.image}
                  style={{
                    ...imgStyle,
                    height: "120px",
                    width: "100%",
                    marginBottom: "70px"
                  }}
                />
                <Card.Body
                  style={{
                    ...textOverlayStyle,
                    background: "none",
                    width: "100%",
                    marginLeft: "-12px",
                    textTransform: "capitalize"
                  }}>
                  {/* Yazıyı 15 karakterle sınırlama */}
                  <Card.Title
                    style={{
                      color: "black",
                      fontSize: "0.6em",
                      fontWeight: "bold"
                    }}>
                    {item.title.length > 45
                      ? item.title.substring(0, 45) + "..."
                      : item.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
