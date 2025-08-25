import React from "react";
import "../styles/Header.css"; // Styling dosyasını ayrıca ekleyebilirsiniz
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navbar, Nav } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const pages = ["Udemy Business", "Udemy'de Eğitim Verin", "Öğrenim İçeriğim"];
const explanations = [
  "Ekibinize en iyi 27.000+ Udemy kursuna istedikleri zaman istedikleri yerden erişebilme imkanı sağlayın.",
  "Bildiklerinizi fırsata dönüştürün ve tüm dünyada milyonlarca kişiye ulaşın.",
  "Öğrenim İçeriğime Gidin"
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: "#ffffff",
        color: "black",
        paddingLeft: "0",
        paddingRight: "0",
        width: "100%"
      }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img
            src={Logo}
            alt='Logo'
            style={{ height: "75px", marginLeft: "-200px" }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: 0
            }}></Typography>

          <Navbar expand='lg' sx={{ flexGrow: 1 }}>
            <Container>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <NavDropdown title='Keşfedin' id='basic-nav-dropdown'>
                    <NavDropdown.Item href='#action/3.1'>
                      Action
                    </NavDropdown.Item>
                    <NavDropdown title='More Options' id='nested-nav-dropdown'>
                      <NavDropdown.Item href='#action/3.4'>
                        Option 1
                      </NavDropdown.Item>
                      <NavDropdown.Item href='#action/3.5'>
                        Option 2
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown.Item href='#action/3.3'>
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Search
            sx={{
              borderRadius: "25px",
              padding: "5px 50px",
              width: "100em",
              border: "1px solid #000",
              marginLeft: "20px"
            }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Dilediğiniz şeyi arayın…'
              inputProps={{ "aria-label": "search" }}
              sx={{
                width: "50em",
                padding: "0 20px"
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", margin: "0 20px" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "20px"
            }}>
            {pages.map((page, index) => (
              <NavDropdown
                key={page}
                title={page}
                id={`dropdown-${page}`}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  marginRight: "20px"
                }}>
                <NavDropdown.Item href='#action/3.1'>
                  <div>{explanations[index]}</div>
                </NavDropdown.Item>
              </NavDropdown>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              marginLeft: "20px"
            }}>
            <FavoriteBorderIcon sx={{ fontSize: "x-large", mr: 2 }} />
            <ShoppingCartOutlinedIcon sx={{ fontSize: "x-large", mr: 2 }} />
            <NotificationsNoneIcon sx={{ fontSize: "x-large" }} />
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: "20px" }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Enes Şen' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
