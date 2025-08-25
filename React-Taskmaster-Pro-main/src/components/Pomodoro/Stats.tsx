import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Whatshot as FireIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { format, parseISO, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatsProps {
  onClose: () => void;
}

const Stats = ({ onClose }: StatsProps) => {
  const { stats, dailyGoal } = useSelector((state: RootState) => state.pomodoro);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Son 7 günün verilerini hazırla
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const dayStats = stats.dailyStats.find(stat => stat.date === date);
    return {
      date,
      workTime: dayStats?.totalWorkTime || 0,
      sessions: dayStats?.completedSessions || 0,
    };
  }).reverse();

  const dailyChartData = {
    labels: last7Days.map(day => format(parseISO(day.date), 'EEEE', { locale: tr })),
    datasets: [
      {
        label: 'Çalışma Süresi (Dakika)',
        data: last7Days.map(day => day.workTime),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const sessionChartData = {
    labels: last7Days.map(day => format(parseISO(day.date), 'EEEE', { locale: tr })),
    datasets: [
      {
        label: 'Tamamlanan Oturumlar',
        data: last7Days.map(day => day.sessions),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  // Günlük hedef ilerleme yüzdesi
  const todayStats = stats.dailyStats.find(
    stat => stat.date === format(new Date(), 'yyyy-MM-dd')
  );
  const dailyProgress = todayStats
    ? (todayStats.totalWorkTime / dailyGoal) * 100
    : 0;

  return (
    <>
      <DialogTitle>İstatistikler</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab icon={<TimelineIcon />} label="GÜNLÜK" />
            <Tab icon={<TrendingUpIcon />} label="HAFTALIK" />
            <Tab icon={<FireIcon />} label="STREAK" />
          </Tabs>

          {currentTab === 0 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Günlük Hedef İlerlemesi
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flex: 1, mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(dailyProgress, 100)}
                          sx={{ height: 10, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round(dailyProgress)}%
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {todayStats?.totalWorkTime || 0} / {dailyGoal} dakika
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Son 7 Gün - Çalışma Süresi
                    </Typography>
                    <Line
                      data={dailyChartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                        },
                      }}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Son 7 Gün - Oturumlar
                    </Typography>
                    <Bar
                      data={sessionChartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                        },
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {currentTab === 1 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Haftalık Özet
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {stats.weeklyStats.slice(-1).map(week => (
                        <Box key={week.weekStart}>
                          <Typography variant="subtitle1">
                            {format(parseISO(week.weekStart), 'MMMM d', { locale: tr })}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              Toplam Çalışma: {Math.round(week.totalWorkTime / 60)} saat
                            </Typography>
                            <Typography variant="body2">
                              Tamamlanan Oturumlar: {week.completedSessions}
                            </Typography>
                            <Typography variant="body2">
                              Günlük Ortalama: {Math.round(week.averageSessionsPerDay)} oturum
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      En Verimli Günler
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {stats.dailyStats
                        .sort((a, b) => b.totalWorkTime - a.totalWorkTime)
                        .slice(0, 5)
                        .map(day => (
                          <Box
                            key={day.date}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Typography>
                              {format(parseISO(day.date), 'EEEE, d MMMM', { locale: tr })}
                            </Typography>
                            <Chip
                              label={`${Math.round(day.totalWorkTime / 60)} saat`}
                              size="small"
                              color="primary"
                            />
                          </Box>
                        ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {currentTab === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <FireIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h4" gutterBottom>
                      {stats.streaks.current}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Günlük Streak
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <TrophyIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h4" gutterBottom>
                      {stats.streaks.longest}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      En Uzun Streak
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Streak Geçmişi
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {stats.streaks.history.slice(-5).map((streak, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography>
                            {format(parseISO(streak.startDate), 'd MMM', { locale: tr })} -{' '}
                            {format(parseISO(streak.endDate), 'd MMM', { locale: tr })}
                          </Typography>
                          <Chip
                            label={`${streak.length} gün`}
                            size="small"
                            color="primary"
                          />
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </>
  );
};

export default Stats;