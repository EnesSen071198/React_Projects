import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Logo from "../assets/logo.png";
import React from "react";
import "../App.css";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaLaptop,
  FaCamera,
  FaGamepad,
  FaFacebookF,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

function Header() {
  return (
    <Navbar
      expand='lg'
      style={{
        backgroundColor: "rgb(252 52 13) ",
        color: "white",
        fontWeight: "bold",
        marginBottom: "5px"
      }}>
      <Container>
        <Menu styles={menuStyles}>
          <a id='home' className='menu-item' href='/'>
            <FaHome style={{ marginRight: "10px" }} /> WEBTEKNO
          </a>
          <hr />
          <a id='home' className='menu-item' href='/'>
            <FaHome style={{ marginRight: "10px" }} /> Ana Sayfa
          </a>
          <a id='news' className='menu-item' href='/NewsPage'>
            <FaInfoCircle style={{ marginRight: "10px" }} /> Haber
          </a>
          <a id='video' className='menu-item' href='/video'>
            <FaPhone style={{ marginRight: "10px" }} /> Video
          </a>
          <a id='fav' className='menu-item' href='/fav'>
            <FaLaptop style={{ marginRight: "10px" }} /> Favorilerim
          </a>
          <hr />
          <a id='mostRead' className='menu-item' href='/mostRead'>
            <FaCamera style={{ marginRight: "10px" }} /> En Çok Okunanlar
          </a>
          <a id='mostShare' className='menu-item' href='/mostShare'>
            <FaGamepad style={{ marginRight: "10px" }} /> En Çok Paylaşılanlar
          </a>
          <a id='mostWatch' className='menu-item' href='/mostWatch'>
            <FaGamepad style={{ marginRight: "10px" }} /> En Çok İzlenenler
          </a>
          <hr />
          <a id='about' className='menu-item' href='/about'>
            Hakkımızda
          </a>
          <a id='about' className='menu-item' href='/about'>
            Yazarlar
          </a>
          <a id='about' className='menu-item' href='/about'>
            Ödüllerimiz
          </a>
          <a id='about' className='menu-item' href='/about'>
            Künye
          </a>
          <a id='about' className='menu-item' href='/about'>
            Gizlilik
          </a>
          <a id='about' className='menu-item' href='/about'>
            İletişim
          </a>
          <hr />
          <div className='social-icons' style={socialIconStyles}>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'>
              <FaFacebookF
                size={20}
                style={{ fontSize: "24px", color: "FF5725" }}
              />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'>
              <FaTwitter
                size={20}
                style={{ fontSize: "24px", color: "#FF5725" }}
              />
            </a>
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'>
              <FaYoutube
                size={20}
                style={{ fontSize: "24px", color: "FF5725" }}
              />
            </a>
          </div>
        </Menu>

        <Navbar.Brand href='/' style={{ color: "white" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={Logo} // İçe aktarılan logo kullanılıyor
              alt='Logo'
              style={{ height: "30px", marginRight: "10px" }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/' style={{ color: "white", fontWeight: "bold" }}>
              Ana Sayfa
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to='NewsPage'
              style={{ color: "white", fontWeight: "bold" }}>
              Haber
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to='VideoPage'
              style={{ color: "white", fontWeight: "bold" }}>
              Video
            </Nav.Link>
            <NavDropdown
              title={
                <span style={{ color: "white", fontWeight: "bold" }}>
                  Kategoriler
                </span>
              }
              id='basic-nav-dropdown'
              className='custom-dropdown'>
              <NavDropdown.Item href='#action/3.1'>
                Bilim Haberleri
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Donanım</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Eğitim</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.4'>
                Giyilebilir Teknoloji
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.5'>İnternet</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.6'>
                Kripto Para
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.7'>Mobil</NavDropdown.Item>
              <NavDropdown.Item href='MobilUygulama'>
                Mobil Uygulama
              </NavDropdown.Item>
              <NavDropdown.Item href='Otomobil'>Otomobil</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.10'>Oyun</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.11'>Sektörel</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.12'>
                Sinema ve Dizi
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.13'>
                Sosyal Medya
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.14'>Uzay</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.15'>
                Yapay Zeka
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.16'>Yaşam</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.17'>Yazılım</NavDropdown.Item>
            </NavDropdown>
          </Nav>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end", // Tüm öğeleri sağa hizalar
              alignItems: "center", // Dikey hizalamayı ortalar
              fontSize: "25px",
              gap: "30px" // Öğeler arasına boşluk ekler
            }}>
            <IoSearchOutline style={{ fontSize: "25px" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center", // Simge ve yazıyı ortalar
                gap: "10px",
                fontSize: "20px"
              }}>
              <FaUser />
              <p style={{ margin: 0, fontSize: "15px" }}>Giriş Yap</p>{" "}
              {/* Margin kaldırıldı */}
            </div>
            <CiBookmark style={{ fontSize: "25px" }} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const menuStyles = {
  bmBurgerButton: {
    position: "relative",
    width: "24px", // Burger butonunun genişliği
    height: "20px", // Burger butonunun yüksekliği
    left: "-80px", // Sayfanın solundan mesafe
    top: "2px", // Sayfanın üstünden mesafe
    zIndex: "1001", // Burger butonunun üstte olmasını sağlamak
    marginRight: "-80px"
  },
  bmBurgerBars: {
    background: "white", // Burger menü çizgilerinin rengi
    height: "3px" // Çizgi kalınlığı
  },
  bmCrossButton: {
    height: "40px", // Çarpı butonunun yüksekliği
    width: "40px", // Çarpı butonunun genişliği
    top: "20px", // Üstten mesafe
    right: "20px", // Sağdan mesafe
    zIndex: "1002" // Çarpı butonunun üstte olmasını sağlamak
  },
  bmCross: {
    background: "#bdc3c7", // Çarpı butonunun rengi
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0"
  },
  bmMenu: {
    background: "#373a47", // Menü arka plan rengi
    padding: "2.5em 1.5em 0",
    fontSize: "14px",
    backgroundColor: "white",
    width: "300px", // Menü genişliği
    position: "fixed", // Sabit pozisyon
    left: "0", // Menü başlangıçta görünür olmalı
    top: "0", // Üstten sıfır
    height: "100%", // Menünün yüksekliği
    zIndex: "1000", // Menü öğelerinin üstte olmasını sağlamak
    transition: "left 0.3s ease-in-out" // Menü açılma geçişi
  },
  bmItemList: {
    color: "#b8b7ad", // Menü öğelerinin rengi
    padding: "0.8em",
    display: "block",
    textAlign: "left"
  },
  bmItem: {
    display: "block",
    padding: "10px 0",
    textAlign: "left",
    fontSize: "18px",
    textDecoration: "none", // Alt çizgiyi kaldırıyoruz
    color: "#808080" // Gri renk
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)" // Arka plan transparan
  }
};

// Yeni stil sınıfı: Sosyal medya ikonları için stil
const socialIconStyles = {
  display: "flex",
  justifyContent: "center",
  gap: "15px", // İkonlar arasındaki boşluk
  marginTop: "20px",
  color: "orange"
};

export default React.memo(Header);
