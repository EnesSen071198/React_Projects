import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProductivityStats = () => {
  const theme = useTheme();
  const todos = useSelector((state: RootState) => state.todos.items);
  const pomodoroStats = useSelector((state: RootState) => state.pomodoro);

  const stats = {
    completed: todos.filter(todo => todo.completed).length,
    total: todos.length,
    focusTime: pomodoroStats.totalFocusTime,
    streak: pomodoroStats.streak,
  };

  const completionRate = stats.total > 0
    ? (stats.completed / stats.total) * 100
    : 0;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CompletedIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Tamamlanan
              </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
              {stats.completed}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Toplam {stats.total} görevden
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PendingIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Bekleyen
              </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
              {stats.total - stats.completed}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={100 - completionRate}
              color="warning"
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Tamamlanması gereken
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimeIcon color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Odaklanma
              </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
              {formatTime(stats.focusTime)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(stats.focusTime / (8 * 60)) * 100} // 8 saatlik hedef
              color="info"
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Toplam odaklanma süresi
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Seri
              </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
              {stats.streak}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(stats.streak / 7) * 100} // 7 günlük hedef
              color="primary"
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Günlük hedef serisi
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductivityStats;