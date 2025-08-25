import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Dialog,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  Flag as GoalIcon,
  Category as CategoryIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
  Work as WorkIcon,
  Coffee as CoffeeIcon,
  Whatshot as FireIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskStats from '../components/Progress/TaskStats';
import TimeStats from '../components/Progress/TimeStats';
import GoalList from '../components/Progress/GoalList';
import CategoryStats from '../components/Progress/CategoryStats';
import GoalForm from '../components/Progress/GoalForm';
import ProductivityScore from '../components/Progress/ProductivityScore';

const ProgressPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  
  // Store'dan verileri al
  const todos = useSelector((state: RootState) => state.todos.items);
  const pomodoroSessions = useSelector((state: RootState) => state.pomodoro.sessions);
  const pomodoroStats = useSelector((state: RootState) => state.pomodoro.stats);
  const progress = useSelector((state: RootState) => state.progress);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Bugünün istatistiklerini hesapla
  const today = new Date().toDateString();
  const todayTasks = todos.filter(task => 
    new Date(task.createdAt).toDateString() === today
  );
  const completedTodayTasks = todayTasks.filter(task => task.completed);
  
  const todaySessions = pomodoroSessions.filter(session => 
    new Date(session.startTime).toDateString() === today && session.completed
  );
  const todayWorkSessions = todaySessions.filter(s => s.type === 'work').length;
  const todayBreakSessions = todaySessions.filter(s => s.type === 'break').length;
  
  // Toplam istatistikler
  const totalTasks = todos.length;
  const completedTasks = todos.filter(task => task.completed).length;
  const totalWorkSessions = pomodoroSessions.filter(s => s.type === 'work' && s.completed).length;
  const totalWorkTime = Math.round(totalWorkSessions * 25 / 60); // saat cinsinden

  // Streak hesaplama
  const currentStreak = pomodoroStats.streaks?.current || 0;
  const longestStreak = pomodoroStats.streaks?.longest || 0;

  // Görev tamamlama yüzdesi
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const OverviewCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    color = 'primary',
    progress 
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    progress?: number;
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={progress}
            color={color}
            sx={{ height: 8, borderRadius: 4 }}
          />
        )}
      </CardContent>
    </Card>
  );

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
            İlerleme Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Performansınızı izleyin ve hedeflerinizi takip edin
          </Typography>
        </Box>

        <Box>
          <Tooltip title="Yeni Hedef Ekle">
            <IconButton 
              onClick={() => setIsGoalFormOpen(true)}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Üretkenlik Puanı */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <ProductivityScore score={progress.productivityScore} />
        </Grid>
      </Grid>

      {/* Özet Kartları */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Toplam Görev"
            value={totalTasks}
            subtitle={`${completedTasks} tamamlandı`}
            icon={<AssessmentIcon />}
            color="primary"
            progress={taskCompletionRate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Pomodoro Oturumları"
            value={totalWorkSessions}
            subtitle={`${todayWorkSessions} bugün`}
            icon={<TimerIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Toplam Odaklanma"
            value={`${totalWorkTime}h`}
            subtitle="Çalışma süresi"
            icon={<WorkIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Mevcut Streak"
            value={currentStreak}
            subtitle={`En uzun: ${longestStreak} gün`}
            icon={<FireIcon />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Bugünün Performansı */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bugünün Performansı
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                      <AssessmentIcon />
                    </Avatar>
                    <Typography variant="h5">{completedTodayTasks.length}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tamamlanan Görev
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      / {todayTasks.length} görev
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                      <TimerIcon />
                    </Avatar>
                    <Typography variant="h5">{todayWorkSessions}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Çalışma Oturumu
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {Math.round(todayWorkSessions * 25 / 60 * 10) / 10}h odaklanma
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                      <CoffeeIcon />
                    </Avatar>
                    <Typography variant="h5">{todayBreakSessions}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mola Oturumu
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Dinlenme zamanı
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ana İçerik Sekmeleri */}
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<AssessmentIcon />}
            label="GÖREV ANALİZİ"
            id="progress-tab-0"
            aria-controls="progress-tabpanel-0"
          />
          <Tab
            icon={<TimelineIcon />}
            label="ZAMAN İSTATİSTİKLERİ"
            id="progress-tab-1"
            aria-controls="progress-tabpanel-1"
          />
          <Tab
            icon={<GoalIcon />}
            label="HEDEFLER"
            id="progress-tab-2"
            aria-controls="progress-tabpanel-2"
          />
          <Tab
            icon={<CategoryIcon />}
            label="KATEGORİ ANALİZİ"
            id="progress-tab-3"
            aria-controls="progress-tabpanel-3"
          />
        </Tabs>

        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {currentTab === 0 && (
            <TaskStats
              daily={progress.taskProgress.daily}
              weekly={progress.taskProgress.weekly}
              monthly={progress.taskProgress.monthly}
            />
          )}
          {currentTab === 1 && (
            <TimeStats
              daily={progress.timeProgress.daily}
              weekly={progress.timeProgress.weekly}
              monthly={progress.timeProgress.monthly}
            />
          )}
          {currentTab === 2 && (
            <GoalList goals={progress.goals} />
          )}
          {currentTab === 3 && (
            <CategoryStats categories={progress.taskProgress.categoryProgress} />
          )}
        </Box>
      </Paper>

      {/* Hedef Formu */}
      <Dialog
        open={isGoalFormOpen}
        onClose={() => setIsGoalFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <GoalForm onClose={() => setIsGoalFormOpen(false)} />
      </Dialog>
    </Box>
  );
};

export default ProgressPage;