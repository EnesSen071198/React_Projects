import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Chip,
} from '@mui/material';
import {
  Google as GoogleIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
}

interface GoogleAuthProps {
  onUserChange?: (user: GoogleUser | null) => void;
}

const GoogleAuth = ({ onUserChange }: GoogleAuthProps) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Demo mode - Sadece kaydedilmiş kullanıcıyı kontrol et
    const savedUser = localStorage.getItem('google_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        onUserChange?.(parsedUser);
        console.log('Demo kullanıcı otomatik giriş:', parsedUser);
      } catch (error) {
        console.error('Saved user parse error:', error);
        localStorage.removeItem('google_user');
      }
    }
  }, []);

  // Demo mode - Google API initialization not needed

  const handleSignIn = async () => {
    setIsSigningIn(true);
    
    // Demo mode - Direkt demo kullanıcı oluştur
    console.log('Demo giriş başlatılıyor...');
    
    // Simulate loading delay
    setTimeout(() => {
      const demoUser: GoogleUser = {
        id: 'demo-user-' + Date.now(),
        name: 'Demo Kullanıcı',
        email: 'demo@taskmaster.com',
        picture: 'https://via.placeholder.com/150/4285f4/ffffff?text=DU',
        givenName: 'Demo',
        familyName: 'Kullanıcı',
      };
      
      setUser(demoUser);
      localStorage.setItem('google_user', JSON.stringify(demoUser));
      onUserChange?.(demoUser);
      setIsSigningIn(false);
      
      console.log('Demo giriş başarılı:', demoUser);
    }, 1000); // 1 saniye bekleme
  };

  const handleSignOut = () => {
    // Demo mode - Basit çıkış
    setUser(null);
    localStorage.removeItem('google_user');
    onUserChange?.(null);
    handleMenuClose();
    console.log('Demo çıkış başarılı');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <GoogleIcon sx={{ fontSize: 64, color: '#4285f4', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            TaskMaster Pro
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Görevlerinizi ve verilerinizi güvenle kaydetmek için Google hesabınızla giriş yapın
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn}
            disabled={isSigningIn}
            startIcon={<GoogleIcon />}
            sx={{
              bgcolor: '#4285f4',
              color: 'white',
              '&:hover': {
                bgcolor: '#3367d6',
                boxShadow: '0 6px 16px rgba(66, 133, 244, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                bgcolor: '#9aa0a6',
              },
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5,
              px: 3,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {isSigningIn ? 'Giriş Yapılıyor...' : 'Demo ile Giriş Yap'}
          </Button>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              🚀 <strong>Demo Mode:</strong> Hemen deneyin!{' '}
              <strong>Tüm özellikler</strong> aktif ve{' '}
              <strong>veriler güvende</strong> saklanır.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Chip
        avatar={<Avatar src={user.picture} sx={{ width: 24, height: 24 }} />}
        label={user.givenName}
        color="primary"
        variant="outlined"
      />
      
      <IconButton onClick={handleMenuClick} color="inherit">
        <Avatar src={user.picture} sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2">{user.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={() => { window.location.href = '/profile'; handleMenuClose(); }}>
          <AccountIcon sx={{ mr: 2 }} />
          Profil
        </MenuItem>
        
        <MenuItem onClick={() => { window.location.href = '/settings'; handleMenuClose(); }}>
          <SettingsIcon sx={{ mr: 2 }} />
          Ayarlar
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon sx={{ mr: 2 }} />
          Çıkış Yap
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default GoogleAuth;