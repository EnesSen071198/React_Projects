import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = ({ darkMode, onToggleDarkMode }: HeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar position="sticky" elevation={0} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskMaster Pro
        </Typography>
        <IconButton color="inherit" onClick={onToggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;