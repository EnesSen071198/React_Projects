import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistribution = () => {
  const theme = useTheme();
  const todos = useSelector((state: RootState) => state.todos.items);
  const categories = useSelector((state: RootState) => state.categories.items);

  const getCategoryStats = () => {
    const stats = new Map();

    todos.forEach(todo => {
      const categoryId = todo.category.id;
      if (!stats.has(categoryId)) {
        stats.set(categoryId, { count: 0, name: todo.category.name, color: todo.category.color });
      }
      stats.get(categoryId).count++;
    });

    return Array.from(stats.values());
  };

  const categoryStats = getCategoryStats();

  const data = {
    labels: categoryStats.map(stat => stat.name),
    datasets: [
      {
        data: categoryStats.map(stat => stat.count),
        backgroundColor: categoryStats.map(stat => stat.color),
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Görev Dağılımı (Kategorilere Göre)',
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CategoryDistribution;