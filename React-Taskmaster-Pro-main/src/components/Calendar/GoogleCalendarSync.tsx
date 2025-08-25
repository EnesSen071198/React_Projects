import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Sync as SyncIcon,
  CloudDownload as ImportIcon,
  CloudUpload as ExportIcon,
  Event as CalendarIcon,
} from '@mui/icons-material';

interface GoogleCalendarSyncProps {
  open: boolean;
  onClose: () => void;
  onSync: (calendars: GoogleCalendar[]) => void;
}

interface GoogleCalendar {
  id: string;
  summary: string;
  backgroundColor: string;
  accessRole: string;
  selected: boolean;
}

const GoogleCalendarSync = ({ open, onClose, onSync }: GoogleCalendarSyncProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(false);

  useEffect(() => {
    // Demo mode - simulated Google Calendar
    if (open) {
      setLoading(true);
      // Simulate Google Calendar connection
      setTimeout(() => {
        const demoCalendars: GoogleCalendar[] = [
          {
            id: 'primary',
            summary: 'Ana Takvim',
            backgroundColor: '#1976d2',
            accessRole: 'owner',
            selected: true,
          },
          {
            id: 'work',
            summary: 'İş Takvimi',
            backgroundColor: '#f57c00',
            accessRole: 'owner',
            selected: false,
          },
          {
            id: 'personal',
            summary: 'Kişisel Takvim',
            backgroundColor: '#388e3c',
            accessRole: 'owner',
            selected: false,
          },
          {
            id: 'birthdays',
            summary: 'Doğum Günleri',
            backgroundColor: '#7b1fa2',
            accessRole: 'reader',
            selected: false,
          },
        ];
        setCalendars(demoCalendars);
        setIsSignedIn(true);
        setLoading(false);
      }, 1500);
    }
  }, [open]);

  // Demo mode handlers
  const handleSignIn = async () => {
    setLoading(true);
    // Simulate sign in process
    setTimeout(() => {
      setIsSignedIn(true);
      setLoading(false);
    }, 1000);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setCalendars([]);
  };

  // Demo mode - calendars already loaded in useEffect

  const toggleCalendarSelection = (calendarId: string) => {
    setCalendars(prev => 
      prev.map(cal => 
        cal.id === calendarId ? { ...cal, selected: !cal.selected } : cal
      )
    );
  };

  const handleSync = () => {
    const selectedCalendars = calendars.filter(cal => cal.selected);
    onSync(selectedCalendars);
    onClose();
  };

  // Demo mode sync - just simulate success
  const syncEvents = async (calendarIds: string[]) => {
    setLoading(true);
    
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    
    // Return demo events
    return [
      {
        id: 'demo-event-1',
        title: 'Demo Toplantı',
        start: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        end: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // Tomorrow + 1h
        description: 'Demo takvim etkinliği',
        location: 'Online',
        source: 'google',
        calendarId: 'primary',
      },
      {
        id: 'demo-event-2',
        title: 'Proje Görüşmesi',
        start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // +2h
        description: 'Yeni proje hakkında',
        location: 'Ofis',
        source: 'google',
        calendarId: 'work',
      }
    ];
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GoogleIcon color="primary" />
          <Typography variant="h6">Google Calendar Entegrasyonu</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {!isSignedIn ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <GoogleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              Google hesabınıza giriş yaparak takvimlerinizi senkronize edebilirsiniz.
            </Typography>
            <Button
              variant="contained"
              onClick={handleSignIn}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
              sx={{ mt: 2 }}
            >
              Google ile Giriş Yap
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Demo Takvimler</Typography>
              <Chip 
                label="Demo Mode" 
                color="primary" 
                size="small"
                icon={<GoogleIcon />}
              />
            </Box>

            <List>
              {calendars.map((calendar) => (
                <ListItem key={calendar.id}>
                  <ListItemIcon>
                    <CalendarIcon sx={{ color: calendar.backgroundColor }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={calendar.summary}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip size="small" label={calendar.accessRole} />
                      </Box>
                    }
                  />
                  <Switch
                    checked={calendar.selected}
                    onChange={() => toggleCalendarSelection(calendar.id)}
                  />
                </ListItem>
              ))}
            </List>

            {calendars.length > 0 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                  />
                }
                label="Otomatik senkronizasyon (15 dakikada bir)"
                sx={{ mt: 2 }}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleSignOut}
                fullWidth
              >
                Çıkış Yap
              </Button>
              <Button
                variant="contained"
                onClick={handleSync}
                disabled={calendars.filter(cal => cal.selected).length === 0}
                startIcon={<SyncIcon />}
                fullWidth
              >
                Senkronize Et
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoogleCalendarSync;