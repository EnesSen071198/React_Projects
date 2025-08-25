import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Fab,
  useTheme,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import { Add as AddIcon, List as ListIcon, Category as CategoryIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';

import CategoryForm from '../components/Tasks/CategoryForm';
import { Todo } from '../types';
import { addTodo, updateTodo, deleteTodo, toggleTodo, updateTodoStatus } from '../store/slices/todosSlice';
import { RootState } from '../store';

const TasksPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Todo | undefined>(undefined);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // 0: Tüm Görevler, 1+: Kategoriler
  
  // Redux state
  const todos = useSelector((state: RootState) => state.todos.items);
  const categories = useSelector((state: RootState) => state.categories.items);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Todo) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTodo(taskId));
  };

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTodo(taskId));
  };

  const handleUpdateStatus = (taskId: string, status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled') => {
    dispatch(updateTodoStatus({ id: taskId, status }));
  };

  // Tab değişimi
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Filtrelenmiş görevleri getir
  const getFilteredTodos = () => {
    if (selectedTab === 0) {
      return todos; // Tüm görevler
    }
    
    const category = categories[selectedTab - 1];
    if (!category) return [];
    
    return todos.filter(todo => todo.category?.id === category.id);
  };

  // Kategori başına görev sayısını hesapla
  const getCategoryTaskCount = (categoryId: string) => {
    return todos.filter(todo => todo.category?.id === categoryId).length;
  };

  const handleSaveTask = (taskData: Partial<Todo>) => {
    if (editingTask) {
      dispatch(updateTodo({ 
        ...editingTask, 
        ...taskData,
        updatedAt: new Date()
      }));
    } else {
      const newTask: Todo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: taskData.title || '',
        description: taskData.description || '',
        completed: false,
        priority: taskData.priority || 'medium',
        category: taskData.category || categories[0], // Default ilk kategori
        subCategory: taskData.subCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: undefined,
        assignedTo: taskData.assignedTo,
        labels: taskData.labels || [],
        subTasks: [],
        order: 0,
        parentId: taskData.parentId,
        attachments: [],
        status: taskData.status || 'not_started',
        estimatedTime: taskData.estimatedTime,
        actualTime: taskData.actualTime,
        recurring: taskData.recurring,
        notifications: taskData.notifications,
        customFields: taskData.customFields,
        progress: 0,
        comments: [],
        history: [],
        dueDate: taskData.dueDate,
      };
      dispatch(addTodo(newTask));
    }
    setIsTaskFormOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Görevler
      </Typography>

      <Box sx={{ flex: 1 }}>
          <Paper
            elevation={2}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',overflow: 'hidden !important'
            }}
          >
            {/* Tab Sistemi */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 1, pt: 1, display: 'flex', alignItems: 'center' }}>
              <Tabs 
                value={selectedTab} 
                onChange={handleTabChange} 
                variant="scrollable" 
                scrollButtons="auto" 
                sx={{ 
                  flex: 1,
                  '& .MuiTabs-scroller': {
                    overflow: 'hidden !important'
                  },
                  '& .MuiTabScrollButton-root': {
                    display: 'none'
                  }
                }}
              >
                <Tab 
                  icon={<ListIcon />} 
                  iconPosition="start"
                  label={
                    <Badge badgeContent={todos.length} color="primary" max={999}>
                      Tüm Görevler
                    </Badge>
                  }
                  sx={{ minWidth: 'auto', flexShrink: 1 }}
                />
                {categories.map((category) => (
                  <Tab 
                    key={category.id}
                    icon={<CategoryIcon sx={{ color: category.color }} />}
                    iconPosition="start"
                    label={
                      <Badge badgeContent={getCategoryTaskCount(category.id)} color="primary" max={999}>
                        {category.name}
                      </Badge>
                    }
                    sx={{ minWidth: 'auto', flexShrink: 1 }}
                  />
                ))}
              </Tabs>
              <Tooltip title="Yeni Kategori Ekle">
                <IconButton 
                  size="small" 
                  onClick={() => setIsCategoryFormOpen(true)}
                  sx={{ ml: 1, color: 'primary.main' }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            {/* Görev Listesi */}
            <Box sx={{ flex: 1, overflow: 'auto', overflowX: 'hidden !important'}}>
              <TaskList
                todos={getFilteredTodos()}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onToggleTask={handleToggleTask}
                onUpdateStatus={handleUpdateStatus}
              />
            </Box>
          </Paper>
      </Box>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: theme.spacing(3),
          right: theme.spacing(3),
        }}
        onClick={handleAddTask}
      >
        <AddIcon />
      </Fab>

      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      <CategoryForm
        open={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
      />
    </Box>
  );
};

export default TasksPage;