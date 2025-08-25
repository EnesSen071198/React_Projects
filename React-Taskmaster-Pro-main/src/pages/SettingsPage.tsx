import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as ThemeIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Download as ExportIcon,
  Upload as ImportIcon,
  Delete as DeleteIcon,
  Backup as BackupIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useThemeContext } from '../theme/ThemeProvider';

const SettingsPage = () => {
  const { mode: themeMode, setMode: setThemeMode } = useThemeContext();
  
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sound: true,
      reminders: true,
    },
    appearance: {
      theme: 'system',
      language: 'tr',
      compactMode: false,
    },
    data: {
      autoBackup: true,
      backupFrequency: 'daily',
    },
    privacy: {
      analytics: false,
      crashReports: true,
    },
  });

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde ayarları yükle
    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        
        // Tema ayarını ThemeProvider ile senkronize et
        if (parsedSettings.appearance?.theme) {
          setThemeMode(parsedSettings.appearance.theme);
        }
      } catch (error) {
        console.error('Settings parse error:', error);
      }
    }
    
    // Mevcut tema mode'unu settings'e yansıt
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: themeMode,
      }
    }));
  }, []);

  const handleSettingChange = (category: string, setting: string) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = 'checked' in event.target ? event.target.checked : event.target.value;
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: value,
      },
    };
    setSettings(newSettings);
    
    // Ayarları localStorage'a kaydet
    localStorage.setItem('app_settings', JSON.stringify(newSettings));
    
    // Tema değişikliği varsa gerçek tema provider'ını güncelle
    if (category === 'appearance' && setting === 'theme') {
      setThemeMode(value as 'light' | 'dark' | 'system');
    }
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  };

  const handleExportData = () => {
    const data = {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      settings: settings,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskmaster-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportDialogOpen(false);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.todos) localStorage.setItem('todos', JSON.stringify(data.todos));
          if (data.categories) localStorage.setItem('categories', JSON.stringify(data.categories));
          if (data.settings) setSettings(data.settings);
          
          alert('Veriler başarıyla içe aktarıldı!');
          window.location.reload();
        } catch (error) {
          alert('Dosya formatı hatalı!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteAllData = () => {
    localStorage.removeItem('todos');
    localStorage.removeItem('categories');
    localStorage.removeItem('google_user');
    alert('Tüm veriler silindi!');
    setDeleteDialogOpen(false);
    window.location.reload();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Ayarlar
      </Typography>

      <Grid container spacing={3}>
        {/* Bildirimler */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Bildirimler
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Push Bildirimleri"
                    secondary="Tarayıcı bildirimleri"
                  />
                  <Switch
                    checked={settings.notifications.push}
                    onChange={handleSettingChange('notifications', 'push')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="E-posta Bildirimleri"
                    secondary="E-posta ile hatırlatıcılar"
                  />
                  <Switch
                    checked={settings.notifications.email}
                    onChange={handleSettingChange('notifications', 'email')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Ses Bildirimleri"
                    secondary="Bildirim sesleri"
                  />
                  <Switch
                    checked={settings.notifications.sound}
                    onChange={handleSettingChange('notifications', 'sound')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Hatırlatıcılar"
                    secondary="Görev hatırlatıcıları"
                  />
                  <Switch
                    checked={settings.notifications.reminders}
                    onChange={handleSettingChange('notifications', 'reminders')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Görünüm */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ThemeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Görünüm
              </Typography>

              <List>
                <ListItem>
                  <ListItemText primary="Tema" />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.appearance.theme}
                      onChange={handleSettingChange('appearance', 'theme')}
                    >
                      <MenuItem value="light">Açık</MenuItem>
                      <MenuItem value="dark">Koyu</MenuItem>
                      <MenuItem value="system">Sistem</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>

                <ListItem>
                  <ListItemText primary="Dil" />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.appearance.language}
                      onChange={handleSettingChange('appearance', 'language')}
                    >
                      <MenuItem value="tr">Türkçe</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Kompakt Mod"
                    secondary="Daha az boşluk"
                  />
                  <Switch
                    checked={settings.appearance.compactMode}
                    onChange={handleSettingChange('appearance', 'compactMode')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Veri ve Yedekleme */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <StorageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Veri ve Yedekleme
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Otomatik Yedekleme"
                        secondary="Verilerinizi otomatik yedekle"
                      />
                      <Switch
                        checked={settings.data.autoBackup}
                        onChange={handleSettingChange('data', 'autoBackup')}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemText primary="Yedekleme Sıklığı" />
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={settings.data.backupFrequency}
                          onChange={handleSettingChange('data', 'backupFrequency')}
                        >
                          <MenuItem value="daily">Günlük</MenuItem>
                          <MenuItem value="weekly">Haftalık</MenuItem>
                          <MenuItem value="monthly">Aylık</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Veri İşlemleri
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        startIcon={<ExportIcon />}
                        variant="outlined"
                        onClick={() => setExportDialogOpen(true)}
                        fullWidth
                      >
                        Verileri Dışa Aktar
                      </Button>

                      <Button
                        startIcon={<ImportIcon />}
                        variant="outlined"
                        component="label"
                        fullWidth
                      >
                        Verileri İçe Aktar
                        <input
                          type="file"
                          accept=".json"
                          hidden
                          onChange={handleImportData}
                        />
                      </Button>

                      <Button
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                        fullWidth
                      >
                        Tüm Verileri Sil
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Gizlilik */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Gizlilik
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                Verileriniz tamamen yerel olarak saklanır ve üçüncü taraflarla paylaşılmaz.
              </Alert>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Analitik Veriler"
                    secondary="Anonim kullanım verilerini paylaş"
                  />
                  <Switch
                    checked={settings.privacy.analytics}
                    onChange={handleSettingChange('privacy', 'analytics')}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Hata Raporları"
                    secondary="Hata ayıklama için otomatik raporlar"
                  />
                  <Switch
                    checked={settings.privacy.crashReports}
                    onChange={handleSettingChange('privacy', 'crashReports')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Verileri Dışa Aktar</DialogTitle>
        <DialogContent>
          <Typography>
            Tüm görevleriniz, kategorileriniz ve ayarlarınız JSON formatında indirilecek.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>İptal</Button>
          <Button onClick={handleExportData} variant="contained">
            Dışa Aktar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Tüm Verileri Sil</DialogTitle>
        <DialogContent>
          <Typography color="error">
            Bu işlem geri alınamaz! Tüm görevleriniz, kategorileriniz ve ayarlarınız silinecek.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
          <Button onClick={handleDeleteAllData} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;