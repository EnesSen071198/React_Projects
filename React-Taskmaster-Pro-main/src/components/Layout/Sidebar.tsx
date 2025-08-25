import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme } from '@mui/material';
import {
  Assignment as TodoIcon,
  Note as NoteIcon,
  Timer as TimerIcon,
  CalendarToday as CalendarIcon,
  BarChart as StatsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Tasks', icon: <TodoIcon />, path: '/tasks' },
  { text: 'Notes', icon: <NoteIcon />, path: '/notes' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Pomodoro', icon: <TimerIcon />, path: '/pomodoro' },
  { text: 'Progress', icon: <StatsIcon />, path: '/progress' },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;