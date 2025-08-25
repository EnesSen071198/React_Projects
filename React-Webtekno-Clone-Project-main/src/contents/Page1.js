import { Container, Row, Col } from "react-bootstrap";
import MainData from "../data/MainData";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import fetchData from "../data/Data";
import { FaCamera, FaWifi } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

function Page1({ title, image, post, author, readTime, categories, intro }) {
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
  const styles = {
    mainContent: {
      marginBottom: "30px"
    },
    categories: {
      fontSize: "14px",
      color: "#888"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginTop: "10px"
    },
    info: {
      fontSize: "14px",
      color: "#555"
    },
    readTime: {
      marginRight: "15px",
      backgroundColor: "#eee",
      padding: "3px 7px",
      borderRadius: "5px"
    },
    author: {
      marginRight: "15px",
      color: "#999"
    },
    postImage: {
      width: "100%",
      height: "auto",
      marginTop: "20px",
      borderRadius: "5px"
    },
    postText: {
      fontSize: "16px",
      lineHeight: "1.6",
      marginTop: "20px"
    },
    sidebar: {
      marginLeft: "20px",
      wordWrap: "break-word"
    },
    sidebarHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px"
    },
    sidebarTitle: {
      fontSize: "1.5rem",
      marginRight: "10px",
      marginTop: "10px"
    },
    wifiIcon: {
      marginLeft: "10px"
    },
    sidebarItem: {
      position: "relative"
    },
    sidebarCard: {
      display: "flex",
      flexDirection: "row",
      height: "100px",
      marginBottom: "10px",
      overflow: "hidden",
      border: "none"
    },
    sidebarCardImg: {
      height: "100px",
      width: "120px",
      objectFit: "cover"
    },
    sidebarCardBody: {
      padding: "10px"
    },
    sidebarCardTitle: {
      fontSize: "14px",
      marginLeft: "15px",
      lineHeight: "1.4"
    }
  };
  // Style Variables
  const cardStyle = {
    position: "relative",
    width: "100%",
    height: "270px",
    overflow: "hidden",
    cursor: "pointer"
  };

  const textOverlayStyle = {
    position: "absolute",
    bottom: "10px",
    left: "5px",
    color: "white",
    fontSize: "1.5em",
    padding: "10px",
    width: "100%"
  };

  const imgStyle = {
    objectFit: "cover",
    height: "100%",
    width: "100%"
  };

  const rowStyle = {
    display: "flex",
    marginTop: "calc(-1 * var(--bs-gutter-y))",
    marginRight: "calc(-1.1 * var(--bs-gutter-x))",
    marginLeft: "calc(-0.1 * var(--bs-gutter-x))",
    flexWrap: "wrap"
  };

  const headingStyle = {
    fontWeight: "bold",
    color: "#FF5722",
    margin: "0",
    fontSize: "1.25em",
    marginTop: "10px"
  };

  const iconStyle = {
    marginLeft: "10px",
    transform: "rotate(45deg)"
  };

  const cardBodyStyle = {
    ...textOverlayStyle,
    left: "220px",
    backgroundColor: "none",
    color: "black",
    textTransform: "capitalize"
  };

  const titleStyle = {
    wordWrap: "break-word",
    whiteSpace: "normal",
    fontSize: "15px"
  };

  const subTitleStyle = {
    color: "gray",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    position: "absolute",
    top: "-25px",
    left: "0px",
    zIndex: "10"
  };

  const infoStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "10px",
    color: "gray",
    fontSize: "12px"
  };

  return (
    <Container fluid>
      <Col>
        <Row className='justify-content-md-center'>
          <Col xs lg='7'>
            <div style={styles.mainContent}>
              <span style={styles.categories}>{categories}</span>
              <h2 style={styles.title}>{title}</h2>
              <div style={styles.info}>
                <span style={styles.author}>{author}</span>
                <span style={styles.readTime}>{readTime}</span>
              </div>
              <p>{intro}</p>
              <img src={image} alt='post' style={styles.postImage} />
              <p style={styles.postText}>{post}</p>
            </div>
          </Col>

          <Col xs lg='3' style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>En Güncel Haberler</h3>
            </div>

            {api.map((item, index) => (
              <div key={index} style={styles.sidebarItem}>
                <Card style={styles.sidebarCard}>
                  <Card.Img
                    variant='top'
                    src={item.image}
                    alt='card'
                    style={styles.sidebarCardImg}
                  />
                  <Card.Body style={styles.sidebarCardBody}>
                    <Card.Title style={styles.sidebarCardTitle}>
                      {item.title.length > 60
                        ? item.title.substring(0, 60) + "..."
                        : item.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      </Col>

      <Col>
        <Row className='justify-content-md-center'>
          <Col xs lg='6'>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                marginTop: "10px"
              }}>
              <h3 style={headingStyle}>Yayın Akışı</h3>
              <FaWifi size={23} color='gray' style={iconStyle} />
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
                  style={{
                    ...cardStyle,
                    height: "120px",
                    marginBottom: "10px"
                  }}>
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
                  <Card.Body style={cardBodyStyle}>
                    <div style={subTitleStyle}>Spor</div>
                    <Card.Title style={titleStyle}>
                      {item.title.length > 60
                        ? item.title.substring(0, 60) + "..."
                        : item.title}
                    </Card.Title>
                    <div style={infoStyle}>
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
                marginBottom: "20px",
                marginTop: "10px"
              }}>
              <h3 style={headingStyle}>Trend Videolar</h3>
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
                      marginBottom: "80px"
                    }}
                  />
                  <Card.Body
                    style={{
                      ...cardBodyStyle,
                      background: "none",
                      width: "100%",
                      marginLeft: "-25px"
                    }}>
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
        </Row>{" "}
      </Col>
    </Container>
  );
}

export default Page1;
