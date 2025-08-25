import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Dialog,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Fab,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Assessment as StatsIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Timer as TimerIcon,
  Coffee as CoffeeIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Today as TodayIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Timer from '../components/Pomodoro/Timer';
import PomodoroSettings from '../components/Pomodoro/Settings';
import PomodoroStats from '../components/Pomodoro/Stats';
import TaskSelector from '../components/Pomodoro/TaskSelector';
import TaskForm from '../components/Tasks/TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedTask } from '../store/slices/pomodoroSlice';
import { addTodo } from '../store/slices/todosSlice';

const PomodoroPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { 
    isBreak, 
    isRunning, 
    currentSession, 
    selectedTaskId,
    sessions,
    dailyGoal,
    settings 
  } = useSelector((state: RootState) => state.pomodoro);
  
  const tasks = useSelector((state: RootState) => state.todos.items);
  const selectedTask = tasks.find(task => task.id === selectedTaskId);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // Bugünün istatistiklerini hesapla
  const today = new Date().toDateString();
  const todaySessions = sessions.filter(s => 
    new Date(s.startTime).toDateString() === today && s.completed
  );
  const todayWorkSessions = todaySessions.filter(s => s.type === 'work').length;
  const todayBreakSessions = todaySessions.filter(s => s.type === 'break').length;
  const dailyProgress = Math.min((todayWorkSessions / dailyGoal) * 100, 100);

  const handleTaskSelect = (taskId: string) => {
    dispatch(setSelectedTask(taskId));
  };

  const handleSaveTask = (taskData: any) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch(addTodo(newTask));
    // Yeni oluşturulan görevi otomatik seç
    dispatch(setSelectedTask(newTask.id));
  };

  const getCurrentSessionInfo = () => {
    if (isBreak) {
      return {
        title: 'Mola Zamanı',
        icon: <CoffeeIcon sx={{ fontSize: 48 }} />,
        color: 'success.main',
        bgColor: 'success.light',
      };
    } else {
      return {
        title: 'Çalışma Zamanı',
        icon: <WorkIcon sx={{ fontSize: 48 }} />,
        color: 'primary.main',
        bgColor: 'primary.light',
      };
    }
  };

  const sessionInfo = getCurrentSessionInfo();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Üst Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Pomodoro
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Odaklan, çalış, başar
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Yeni Görev">
            <IconButton 
              onClick={() => setIsTaskFormOpen(true)}
              sx={{ 
                bgcolor: 'success.main', 
                color: 'white',
                '&:hover': { bgcolor: 'success.dark' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Günlük İstatistikler">
            <IconButton 
              onClick={() => setIsStatsOpen(true)}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <StatsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ayarlar">
            <IconButton 
              onClick={() => setIsSettingsOpen(true)}
              sx={{ 
                bgcolor: 'grey.100', 
                '&:hover': { bgcolor: 'grey.200' }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ flex: 1 }}>
        {/* Sol Panel - Timer ve Durum */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Günlük İlerleme */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <TodayIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">Günlük Hedef</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {todayWorkSessions} / {dailyGoal} Pomodoro
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={`%${Math.round(dailyProgress)}`}
                      color={dailyProgress >= 100 ? 'success' : 'primary'}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dailyProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: dailyProgress >= 100 ? 'success.main' : 'primary.main',
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Ana Timer */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: sessionInfo.bgColor,
                  background: `linear-gradient(135deg, ${sessionInfo.bgColor} 0%, ${sessionInfo.color} 100%)`,
                  color: 'white',
                  borderRadius: 4,
                  boxShadow: 4,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  {sessionInfo.icon}
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                    {sessionInfo.title}
                  </Typography>
                  {selectedTask && (
                    <Chip
                      label={selectedTask.title}
                      sx={{
                        mt: 1,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                </Box>

                <Timer />

                {/* Timer Kontrolleri için alan (Timer component'inde olacak) */}
              </Paper>
            </Grid>

            {/* Oturum Bilgileri */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                      <WorkIcon />
                    </Avatar>
                    <Typography variant="h6">{todayWorkSessions}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Çalışma Oturumu
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                      <CoffeeIcon />
                    </Avatar>
                    <Typography variant="h6">{todayBreakSessions}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Mola Oturumu
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1 }}>
                      <TrendingUpIcon />
                    </Avatar>
                    <Typography variant="h6">
                      {Math.round((todayWorkSessions * settings.workDuration) / 60)}h
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Toplam Süre
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Sağ Panel - Görev Seçici */}
        <Grid item xs={12} md={4}>
          <TaskSelector 
            onTaskSelect={handleTaskSelect}
            selectedTaskId={selectedTaskId}
          />
        </Grid>
      </Grid>

      {/* Ayarlar Dialog */}
      <Dialog 
        open={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <PomodoroSettings onClose={() => setIsSettingsOpen(false)} />
      </Dialog>

      {/* İstatistikler Dialog */}
      <Dialog 
        open={isStatsOpen} 
        onClose={() => setIsStatsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <PomodoroStats onClose={() => setIsStatsOpen(false)} />
      </Dialog>

      {/* Floating Action Button - Hızlı Başlat */}
      {!isRunning && !selectedTask && (
        <Tooltip title="Görev seçin veya hızlı başlat">
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: theme.spacing(3),
              right: theme.spacing(3),
            }}
            disabled={!selectedTask}
          >
            <PlayIcon />
          </Fab>
        </Tooltip>
      )}

      {/* Görev Ekleme Formu */}
      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
      />
    </Box>
  );
};

export default PomodoroPage;