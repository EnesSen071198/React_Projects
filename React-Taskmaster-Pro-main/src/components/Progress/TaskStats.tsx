import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);
import { format, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface TaskStatsProps {
  daily: any;
  weekly: any;
  monthly: any;
}

const TaskStats = ({ daily, weekly, monthly }: TaskStatsProps) => {
  const todos = useSelector((state: RootState) => state.todos.items);
  
  // Gerçek görev verilerini hesapla
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const inProgressTasks = todos.filter(todo => todo.status === 'in_progress').length;
  const onHoldTasks = todos.filter(todo => todo.status === 'on_hold').length;
  const cancelledTasks = todos.filter(todo => todo.status === 'cancelled').length;

  // Son 7 günün verilerini hazırla (gerçek veri)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayTasks = todos.filter(todo => {
      const createdDate = new Date(todo.createdAt);
      return createdDate.toDateString() === date.toDateString();
    });
    const completedDayTasks = dayTasks.filter(todo => todo.completed);
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      completed: completedDayTasks.length,
      total: dayTasks.length,
    };
  }).reverse();

  const chartData = {
    labels: last7Days.map(day =>
      format(new Date(day.date), 'EEEE', { locale: tr })
    ),
    datasets: [
      {
        label: 'Tamamlanan Görevler',
        data: last7Days.map(day => day.completed),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
      {
        label: 'Toplam Görevler',
        data: last7Days.map(day => day.total),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const StatCard = ({
    title,
    value,
    total,
    color = 'primary',
    info,
  }: {
    title: string;
    value: number;
    total?: number;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    info: string;
  }) => {
    const percentage = total ? (value / total) * 100 : 0;
    
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <Tooltip title={info}>
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" sx={{ mr: 2 }} color={`${color}.main`}>
            {value}
          </Typography>
          {total && (
            <Typography variant="body2" color="text.secondary">
              / {total} görev
            </Typography>
          )}
          {percentage > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 'auto',
                color: `${color}.main`,
              }}
            >
              <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {Math.round(percentage)}%
              </Typography>
            </Box>
          )}
        </Box>

        {total && (
          <LinearProgress
            variant="determinate"
            value={percentage}
            color={color}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              },
            }}
          />
        )}
      </Paper>
    );
  };

  return (
    <Grid container spacing={3}>
      {/* Özet Kartları */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Toplam Görevler"
          value={totalTasks}
          color="primary"
          info="Sistemdeki toplam görev sayısı"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Tamamlanan"
          value={completedTasks}
          total={totalTasks}
          color="success"
          info="Tamamlanan görevlerin sayısı ve oranı"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Devam Eden"
          value={inProgressTasks}
          total={totalTasks}
          color="warning"
          info="Şu anda devam eden görevler"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Beklemede"
          value={onHoldTasks}
          total={totalTasks}
          color="info"
          info="Beklemede olan görevler"
        />
      </Grid>

      {/* Grafik */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Son 7 Gün - Görev İstatistikleri
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskStats;