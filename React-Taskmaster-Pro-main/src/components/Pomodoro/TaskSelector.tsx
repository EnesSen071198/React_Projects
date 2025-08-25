import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Flag as FlagIcon,
  Today as TodayIcon,
  RadioButtonUnchecked,
  CheckCircle,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleTodo } from '../../store/slices/todosSlice';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TaskSelectorProps {
  onTaskSelect?: (taskId: string) => void;
  selectedTaskId?: string;
}

const TaskSelector = ({ onTaskSelect, selectedTaskId }: TaskSelectorProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos.items);
  const sessions = useSelector((state: RootState) => state.pomodoro.sessions);

  // Görevleri kategorilere ayır
  const activeTasks = tasks.filter(task => !task.completed && task.status !== 'cancelled');
  
  // Bugünün görevlerini filtrele
  const todayTasks = activeTasks.filter(task => {
    if (!task.dueDate) return false;
    return isToday(new Date(task.dueDate));
  });

  // Yaklaşan görevleri filtrele
  const upcomingTasks = activeTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate > new Date() && !isToday(dueDate);
  });

  // Devam eden görevleri filtrele
  const inProgressTasks = activeTasks.filter(task => task.status === 'in_progress');

  // Diğer görevler
  const otherTasks = activeTasks.filter(task => 
    !task.dueDate && task.status === 'not_started'
  );

  // Görev başına tamamlanan pomodoro sayısını hesapla
  const getTaskPomodoros = (taskId: string) => {
    return sessions.filter(
      session =>
        session.taskId === taskId &&
        session.completed &&
        session.type === 'work'
    ).length;
  };

  // Tarih formatını güzelleştir
  const formatDueDate = (dueDate: Date) => {
    if (isToday(dueDate)) return 'Bugün';
    if (isTomorrow(dueDate)) return 'Yarın';
    if (isYesterday(dueDate)) return 'Dün';
    return format(dueDate, 'd MMM', { locale: tr });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const handleTaskToggle = (taskId: string) => {
    dispatch(toggleTodo(taskId));
  };

  const handleTaskClick = (taskId: string) => {
    if (onTaskSelect) {
      onTaskSelect(taskId);
    }
  };

  const TaskGroup = ({ title, tasks, icon }: { title: string; tasks: any[]; icon?: React.ReactNode }) => {
    if (tasks.length === 0) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1 }}>
          {icon}
          <Typography variant="subtitle2" color="textSecondary">
            {title} ({tasks.length})
          </Typography>
        </Box>
        <List dense>
          {tasks.map(task => {
            const pomodoroCount = getTaskPomodoros(task.id);
            const isSelected = selectedTaskId === task.id;
            
            return (
              <ListItem
                key={task.id}
                disablePadding
                sx={{
                  bgcolor: isSelected ? 'action.selected' : 'transparent',
                  borderLeft: isSelected ? 4 : 0,
                  borderColor: 'primary.main',
                }}
              >
                <ListItemButton
                  onClick={() => handleTaskClick(task.id)}
                  sx={{ pl: isSelected ? 1 : 2 }}
                >
                  <ListItemIcon>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskToggle(task.id);
                      }}
                    >
                      {task.completed ? (
                        <CheckCircle color="success" />
                      ) : (
                        <RadioButtonUnchecked />
                      )}
                    </IconButton>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.6 : 1,
                          }}
                        >
                          {task.title}
                        </Typography>
                        {task.priority === 'high' && (
                          <FlagIcon color="error" fontSize="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          size="small"
                          label={task.category.name}
                          sx={{
                            backgroundColor: task.category.color,
                            color: 'white',
                            fontSize: '0.7rem',
                            height: 20,
                          }}
                        />
                        
                        {task.dueDate && (
                          <Chip
                            size="small"
                            icon={<TodayIcon />}
                            label={formatDueDate(new Date(task.dueDate))}
                            color={
                              new Date(task.dueDate) < new Date() && !isToday(new Date(task.dueDate))
                                ? 'error'
                                : 'default'
                            }
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        )}
                        
                        {pomodoroCount > 0 && (
                          <Chip
                            size="small"
                            icon={<TimerIcon />}
                            label={pomodoroCount}
                            color="primary"
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        )}
                      </Box>
                    }
                  />
                  
                  <Box sx={{ ml: 1 }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: getPriorityColor(task.priority) + '.main',
                        fontSize: '0.7rem',
                      }}
                    >
                      {task.priority === 'high' ? 'Y' : task.priority === 'medium' ? 'O' : 'D'}
                    </Avatar>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ my: 1 }} />
      </Box>
    );
  };

  return (
    <Paper sx={{ height: '100%', overflow: 'auto', p: 1 }}>
      <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
        Görev Seçici
      </Typography>
      
      <TaskGroup
        title="Devam Eden"
        tasks={inProgressTasks}
        icon={<TimerIcon color="warning" />}
      />
      
      <TaskGroup
        title="Bugün"
        tasks={todayTasks}
        icon={<TodayIcon color="primary" />}
      />
      
      <TaskGroup
        title="Yaklaşan"
        tasks={upcomingTasks.slice(0, 5)}
        icon={<FlagIcon color="info" />}
      />
      
      <TaskGroup
        title="Diğer Görevler"
        tasks={otherTasks.slice(0, 10)}
      />
      
      {activeTasks.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: 'text.secondary',
          }}
        >
          <TimerIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="body2">
            Henüz aktif görev yok
          </Typography>
          <Typography variant="caption">
            Pomodoro için bir görev ekleyin
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TaskSelector;