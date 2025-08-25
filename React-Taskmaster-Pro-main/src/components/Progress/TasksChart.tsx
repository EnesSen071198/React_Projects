import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { format, startOfWeek, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TasksChart = () => {
  const theme = useTheme();
  const todos = useSelector((state: RootState) => state.todos.items);

  const getWeekDays = () => {
    const start = startOfWeek(new Date(), { locale: tr });
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return format(date, 'EEEE', { locale: tr });
    });
  };

  const getTaskCountsByDay = () => {
    const counts = {
      completed: Array(7).fill(0),
      total: Array(7).fill(0),
    };

    todos.forEach(todo => {
      if (!todo.createdAt) return;

      const date = new Date(todo.createdAt);
      const dayIndex = date.getDay();

      counts.total[dayIndex]++;
      if (todo.completed) {
        counts.completed[dayIndex]++;
      }
    });

    return counts;
  };

  const taskCounts = getTaskCountsByDay();
  const labels = getWeekDays();

  const data = {
    labels,
    datasets: [
      {
        label: 'Tamamlanan Görevler',
        data: taskCounts.completed,
        backgroundColor: theme.palette.success.main,
      },
      {
        label: 'Toplam Görevler',
        data: taskCounts.total,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Haftalık Görev İstatistikleri',
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

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TasksChart;