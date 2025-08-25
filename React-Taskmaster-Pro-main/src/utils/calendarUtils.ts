import { Todo } from '../types';
import { CalendarEvent } from '../types/calendar';
import { addDays, format, isValid } from 'date-fns';

// Görevleri calendar event'lerine dönüştür
export const convertTasksToEvents = (tasks: Todo[]): CalendarEvent[] => {
  return tasks
    .filter(task => task.dueDate && isValid(new Date(task.dueDate)))
    .map(task => {
      const dueDate = new Date(task.dueDate!);
      const startTime = new Date(dueDate);
      
      // Eğer sadece tarih varsa, gün boyunca etkinlik yap
      const isAllDay = startTime.getHours() === 0 && startTime.getMinutes() === 0;
      
      let endTime: Date;
      if (isAllDay) {
        endTime = new Date(dueDate);
        endTime.setHours(23, 59, 59);
      } else {
        // Tahmini süre varsa kullan, yoksa 1 saat varsayılan
        const durationMinutes = task.estimatedTime || 60;
        endTime = new Date(startTime.getTime() + durationMinutes * 60000);
      }

      return {
        id: `task-${task.id}`,
        title: task.title,
        start: startTime,
        end: endTime,
        allDay: isAllDay,
        description: task.description,
        category: task.category,
        color: task.category.color,
        status: task.status,
        priority: task.priority,
        completed: task.completed,
        taskId: task.id,
        type: 'task',
        location: '',
        attendees: [],
        reminders: [],
        recurrence: task.recurring ? {
          frequency: task.recurring.frequency,
          interval: task.recurring.interval,
          endDate: task.recurring.endDate,
        } : undefined,
      } as CalendarEvent;
    });
};

// Calendar event'ini göreve dönüştür
export const convertEventToTask = (event: CalendarEvent): Partial<Todo> => {
  return {
    title: event.title,
    description: event.description || '',
    dueDate: new Date(event.start),
    status: event.completed ? 'completed' : 'not_started',
    priority: (event.priority as 'low' | 'medium' | 'high') || 'medium',
    estimatedTime: event.allDay ? undefined : Math.round((new Date(event.end).getTime() - new Date(event.start).getTime()) / 60000),
  };
};

// Görev durumuna göre renk al
export const getTaskEventColor = (task: Todo): string => {
  if (task.completed) {
    return '#4caf50'; // Yeşil
  }
  
  switch (task.priority) {
    case 'high':
      return '#f44336'; // Kırmızı
    case 'medium':
      return '#ff9800'; // Turuncu
    case 'low':
      return '#2196f3'; // Mavi
    default:
      return task.category.color;
  }
};

// Tarih aralığındaki görevleri filtrele
export const filterTasksByDateRange = (tasks: Todo[], startDate: Date, endDate: Date): Todo[] => {
  return tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= startDate && taskDate <= endDate;
  });
};

// Görev için varsayılan calendar event oluştur
export const createTaskEvent = (task: Partial<Todo>, date: Date): CalendarEvent => {
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0); // Varsayılan 09:00
  
  const endTime = new Date(startTime);
  endTime.setHours(10, 0, 0); // 1 saat süre
  
  return {
    id: `new-task-${Date.now()}`,
    title: task.title || 'Yeni Görev',
    start: startTime,
    end: endTime,
    allDay: false,
    description: task.description || '',
    category: { id: 'default', name: 'Görev', color: '#2196f3' },
    color: '#2196f3',
    status: 'not_started',
    priority: 'medium',
    completed: false,
    type: 'task',
    location: '',
    attendees: [],
    reminders: [],
  } as CalendarEvent;
};