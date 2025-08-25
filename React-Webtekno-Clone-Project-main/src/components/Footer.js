import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={contentStyles}>
        <div style={aboutSection}>
          <h3 style={headingStyles}>Hakkımızda</h3>
          <p style={textStyles}>
            Teknoloji dünyasındaki en son haberleri, eğitimleri ve incelemeleri
            sizlerle paylaşıyoruz.
          </p>
        </div>

        <div style={linksSection}>
          <h3 style={headingStyles}>Hızlı Bağlantılar</h3>
          <ul style={listStyles}>
            <li style={listItemStyles}>Ana Sayfa</li>
            <li style={listItemStyles}>Haberler</li>
            <li style={listItemStyles}>Videolar</li>
            <li style={listItemStyles}>İletişim</li>
          </ul>
        </div>

        <div style={socialSection}>
          <h3 style={headingStyles}>Bizi Takip Edin</h3>
          <div style={socialIconContainer}>
            <FaFacebook style={iconStyles} />
            <FaTwitter style={iconStyles} />
            <FaInstagram style={iconStyles} />
            <FaLinkedin style={iconStyles} />
          </div>
        </div>
      </div>

      <div style={bottomBar}>
        <p style={bottomText}>© 2024 Teknoloji Blogu. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

const footerStyles = {
  backgroundColor: "#222",
  color: "white",
  padding: "40px 20px",
  textAlign: "center"
};

const contentStyles = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "30px"
};

const aboutSection = {
  flex: 1,
  padding: "0 20px"
};

const linksSection = {
  flex: 1,
  padding: "0 20px"
};

const socialSection = {
  flex: 1,
  padding: "0 20px"
};

const headingStyles = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px"
};

const textStyles = {
  fontSize: "14px",
  lineHeight: "1.5"
};

const listStyles = {
  listStyle: "none",
  padding: "0"
};

const listItemStyles = {
  fontSize: "14px",
  marginBottom: "10px",
  cursor: "pointer"
};

const socialIconContainer = {
  display: "flex",
  justifyContent: "space-around",
  gap: "20px"
};

const iconStyles = {
  fontSize: "24px",
  color: "white",
  cursor: "pointer"
};

const bottomBar = {
  backgroundColor: "#111",
  padding: "10px 0"
};

const bottomText = {
  fontSize: "14px",
  color: "#aaa"
};

export default React.memo(Footer);
