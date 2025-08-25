import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as ThemeIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useThemeContext } from '../theme/ThemeProvider';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
}

const ProfilePage = () => {
  const { mode, setMode } = useThemeContext();
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('google_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    language: 'tr',
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name: editedName };
      setUser(updatedUser);
      localStorage.setItem('google_user', JSON.stringify(updatedUser));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  const handleSettingChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [setting]: event.target.checked,
    };
    setSettings(newSettings);
    
    // Ayarları localStorage'a kaydet
    localStorage.setItem('profile_settings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    // Sayfa yüklendiğinde ayarları yükle
    const savedSettings = localStorage.getItem('profile_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Profile settings parse error:', error);
      }
    }
  }, []);

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Kullanıcı bilgisi bulunamadı
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Profil
      </Typography>

      <Grid container spacing={3}>
        {/* Kullanıcı Bilgileri */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={user.picture}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <IconButton onClick={handleSave} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="error">
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{user.name}</Typography>
                      <IconButton onClick={() => setIsEditing(true)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ad"
                    secondary={user.givenName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Soyad"
                    secondary={user.familyName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta"
                    secondary={user.email}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Ayarlar */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ayarlar
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bildirimler"
                    secondary="Uygulama bildirimleri"
                  />
                  <Switch
                    checked={settings.notifications}
                    onChange={handleSettingChange('notifications')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta Bildirimleri"
                    secondary="E-posta ile hatırlatıcılar"
                  />
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange('emailNotifications')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <ThemeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Karanlık Tema"
                    secondary={
                      mode === 'light' ? 'Açık tema aktif' : 
                      mode === 'dark' ? 'Koyu tema aktif' : 
                      'Sistem teması aktif'
                    }
                  />
                  <Switch
                    checked={mode === 'dark'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setMode('dark');
                      } else {
                        setMode('light');
                      }
                    }}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dil"
                    secondary="Türkçe"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* İstatistikler */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hesap İstatistikleri
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary">
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toplam Görev
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="success.main">
                      8
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tamamlanan
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="warning.main">
                      25
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pomodoro Oturumu
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="info.main">
                      7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Günlük Streak
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;