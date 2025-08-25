import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Assignment as TaskIcon,
  Notes as NoteIcon,
  CalendarMonth as CalendarIcon,
  Timer as PomodoroIcon,
  TrendingUp as ProgressIcon,
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';
import GoogleAuth from '../Auth/GoogleAuth';

const drawerWidth = 240;

const menuItems = [
  { path: '/tasks', label: 'Görevler', icon: TaskIcon },
  { path: '/notes', label: 'Notlar', icon: NoteIcon },
  { path: '/calendar', label: 'Takvim', icon: CalendarIcon },
  { path: '/pomodoro', label: 'Pomodoro', icon: PomodoroIcon },
  { path: '/progress', label: 'İlerleme', icon: ProgressIcon },
];

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
}

interface MainLayoutProps {
  user?: GoogleUser;
  onUserChange?: (user: GoogleUser | null) => void;
}

const MainLayout = ({  onUserChange }: MainLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const getPageTitle = () => {
    const item = menuItems.find(item => item.path === location.pathname);
    return item ? item.label : '';
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GoogleAuth onUserChange={onUserChange} />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            TaskMaster Pro
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map(({ path, label, icon: Icon }) => (
            <ListItem key={path} disablePadding>
              <Tooltip
                title={!open ? label : ''}
                placement="right"
                TransitionComponent={Zoom}
              >
                <ListItemButton
                  selected={location.pathname === path}
                  onClick={() => {
                    navigate(path);
                    if (isMobile) {
                      setOpen(false);
                    }
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      color={location.pathname === path ? 'primary' : 'inherit'}
                    />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? 5 : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: '64px', // AppBar yüksekliği
          height: 'calc(100vh - 64px)', // AppBar yüksekliğini çıkar
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;