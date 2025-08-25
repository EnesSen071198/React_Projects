import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './components/Layout/MainLayout';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';
import CalendarPage from './pages/CalendarPage';
import PomodoroPage from './pages/PomodoroPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ErrorBoundary from './components/ErrorBoundary';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReminderService from './services/ReminderService';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { ThemeProvider } from './theme/ThemeProvider';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string; 
}

const App = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ReminderService'i başlat
    const reminderService = ReminderService.getInstance(store);

    // Kullanıcı durumunu kontrol et
    const checkUser = () => {
      const savedUser = localStorage.getItem('google_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('User parse error:', error);
          localStorage.removeItem('google_user');
        }
      }
      setIsLoading(false);
    };

    checkUser();

    // Uygulama kapandığında service'i temizle
    return () => {
      reminderService.destroy();
    };
  }, []);

  const handleUserChange = (newUser: GoogleUser | null) => {
    setUser(newUser);
  };

  if (isLoading) {
    return null; // Loading spinner eklenebilir
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
          <ErrorBoundary>
            <ReactNotifications />
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<MainLayout user={user} onUserChange={handleUserChange} />}>
                  <Route index element={<Navigate to="/tasks" replace />} />
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="notes" element={<NotesPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="pomodoro" element={<PomodoroPage />} />
                  <Route path="progress" element={<ProgressPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </Router>
          </ErrorBoundary>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;