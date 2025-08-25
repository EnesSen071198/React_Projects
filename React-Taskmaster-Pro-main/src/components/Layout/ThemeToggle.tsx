import { IconButton, Tooltip } from '@mui/material';
import {
  LightMode as LightIcon,
  DarkMode as DarkIcon,
  SettingsBrightness as SystemIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../theme/ThemeProvider';

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  const getIcon = () => {
    switch (mode) {
      case 'light':
        return <LightIcon />;
      case 'dark':
        return <DarkIcon />;
      default:
        return <SystemIcon />;
    }
  };

  const getTooltipText = () => {
    switch (mode) {
      case 'light':
        return 'Açık Tema (Tıkla: Koyu Temaya Geç)';
      case 'dark':
        return 'Koyu Tema (Tıkla: Sistem Temasına Geç)';
      default:
        return 'Sistem Teması (Tıkla: Açık Temaya Geç)';
    }
  };

  return (
    <Tooltip title={getTooltipText()}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;