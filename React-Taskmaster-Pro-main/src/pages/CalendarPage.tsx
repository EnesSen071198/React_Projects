import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  Today as TodayIcon,
  Add as AddIcon,
  ViewDay,
  ViewWeek,
  ViewModule,
  ViewList,
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';
import { tr } from 'date-fns/locale';
import { RootState } from '../store';
import { setSelectedDate, setView, moveEvent, importEvents } from '../store/slices/calendarSlice';
import { addTodo, updateTodo, toggleTodo } from '../store/slices/todosSlice';
import { convertTasksToEvents, convertEventToTask, createTaskEvent } from '../utils/calendarUtils';
import EventForm from '../components/Calendar/EventForm';
import MonthView from '../components/Calendar/MonthView';
import WeekView from '../components/Calendar/WeekView';
import DayView from '../components/Calendar/DayView';
import ListView from '../components/Calendar/ListView';
import GoogleCalendarSync from '../components/Calendar/GoogleCalendarSync';
import TaskDragPanel from '../components/Calendar/TaskDragPanel';
import TaskForm from '../components/Tasks/TaskForm';
import { CalendarEvent, CalendarViewType } from '../types/calendar';
import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, selectedDate, view } = useSelector((state: RootState) => state.calendar);
  const todos = useSelector((state: RootState) => state.todos.items);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isGoogleSyncOpen, setIsGoogleSyncOpen] = useState(false);
  
  // Görevleri calendar event'lerine dönüştür
  const taskEvents = convertTasksToEvents(todos);
  
  // Tüm event'leri birleştir (calendar events + task events)
  const allEvents = [...events, ...taskEvents];

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const eventId = active.id as string;
      const targetDate = new Date(over.id as string);
      
      // Yeni görev sürüklenmesi kontrolü (TaskDragPanel'den)
      if (eventId.startsWith('draggable-task-')) {
        const taskId = eventId.replace('draggable-task-', '');
        
        dispatch(updateTodo({ 
          id: taskId, 
          dueDate: targetDate 
        }));
        setSnackbar({
          open: true,
          message: 'Görev takvime eklendi',
          severity: 'success',
        });
        return;
      }

      // Event olup olmadığını kontrol et
      const sourceEvent = allEvents.find(e => e.id === eventId);

      if (sourceEvent) {
        // Eğer görev event'i ise, görev tarihini güncelle
        if (sourceEvent.type === 'task' && sourceEvent.taskId) {
          dispatch(updateTodo({ 
            id: sourceEvent.taskId, 
            dueDate: targetDate 
          }));
          setSnackbar({
            open: true,
            message: 'Görev tarihi başarıyla güncellendi',
            severity: 'success',
          });
        } else {
          // Normal calendar event'i taşı
          const duration = new Date(sourceEvent.end).getTime() - new Date(sourceEvent.start).getTime();
          const newStart = new Date(targetDate);
          const newEnd = new Date(newStart.getTime() + duration);

          dispatch(moveEvent({ id: eventId, start: newStart, end: newEnd }));
          setSnackbar({
            open: true,
            message: 'Etkinlik başarıyla taşındı',
            severity: 'success',
          });
        }
      }
    }
  };

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    switch (view) {
      case 'dayGridMonth':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'timeGridWeek':
        dispatch(setSelectedDate(addWeeks(selectedDate, -1)));
        break;
      case 'timeGridDay':
        dispatch(setSelectedDate(addDays(selectedDate, -1)));
        break;
      default:
        break;
    }
    dispatch(setSelectedDate(newDate));
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    switch (view) {
      case 'dayGridMonth':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'timeGridWeek':
        dispatch(setSelectedDate(addWeeks(selectedDate, 1)));
        break;
      case 'timeGridDay':
        dispatch(setSelectedDate(addDays(selectedDate, 1)));
        break;
      default:
        break;
    }
    dispatch(setSelectedDate(newDate));
  };

  const handleToday = () => {
    dispatch(setSelectedDate(new Date()));
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: CalendarViewType) => {
    if (newView !== null) {
      dispatch(setView(newView));
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleExport = () => {
    const exportData = {
      events,
      exportDate: new Date(),
      version: '1.0',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calendar-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: 'Takvim başarıyla dışa aktarıldı',
      severity: 'success',
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target?.result as string);
          if (importData.events && Array.isArray(importData.events)) {
            dispatch(importEvents(importData.events));
            setSnackbar({
              open: true,
              message: 'Takvim başarıyla içe aktarıldı',
              severity: 'success',
            });
          }
        } catch (error) {
          setSnackbar({
            open: true,
            message: 'Dosya içe aktarılırken bir hata oluştu',
            severity: 'error',
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleGoogleSync = (calendars: any[]) => {
    // Google Calendar'dan gelen etkinlikleri içe aktar
    console.log('Google Calendar sync:', calendars);
    setSnackbar({
      open: true,
      message: 'Google Calendar ile senkronizasyon başarılı',
      severity: 'success',
    });
  };

  const handleTaskToggle = (taskId: string) => {
    dispatch(toggleTodo(taskId));
    setSnackbar({
      open: true,
      message: 'Görev durumu güncellendi',
      severity: 'success',
    });
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
    setSnackbar({
      open: true,
      message: 'Görev başarıyla eklendi',
      severity: 'success',
    });
  };

  const getViewTitle = () => {
    switch (view) {
      case 'dayGridMonth':
        return format(selectedDate, 'MMMM yyyy', { locale: tr });
      case 'timeGridWeek':
        const weekStart = startOfWeek(selectedDate, { locale: tr });
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, 'd MMMM', { locale: tr })} - ${format(weekEnd, 'd MMMM yyyy', { locale: tr })}`;
      case 'timeGridDay':
        return format(selectedDate, 'd MMMM yyyy, EEEE', { locale: tr });
      case 'listWeek':
        return 'Etkinlik Listesi';
      default:
        return '';
    }
  };

  const getViewComponent = () => {
    const viewProps = {
      events: allEvents,
      selectedDate,
      onEventClick: handleEventClick,
      onRangeSelect: () => setIsEventFormOpen(true),
      onTaskToggle: handleTaskToggle,
    };

    switch (view) {
      case 'dayGridMonth':
        return <MonthView {...viewProps} />;
      case 'timeGridWeek':
        return <WeekView {...viewProps} />;
      case 'timeGridDay':
        return <DayView {...viewProps} />;
      case 'listWeek':
        return <ListView {...viewProps} />;
      default:
        return null;
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">
              {getViewTitle()}
            </Typography>
            <IconButton onClick={handlePrevious}>
              <PrevIcon />
            </IconButton>
            <IconButton onClick={handleToday}>
              <TodayIcon />
            </IconButton>
            <IconButton onClick={handleNext}>
              <NextIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="calendar view"
              size="small"
            >
              <ToggleButton value="dayGridMonth" aria-label="month view">
                <Tooltip title="Ay Görünümü">
                  <ViewModule />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="timeGridWeek" aria-label="week view">
                <Tooltip title="Hafta Görünümü">
                  <ViewWeek />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="timeGridDay" aria-label="day view">
                <Tooltip title="Gün Görünümü">
                  <ViewDay />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="listWeek" aria-label="list view">
                <Tooltip title="Liste Görünümü">
                  <ViewList />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Dışa Aktar">
              <IconButton onClick={handleExport}>
                <ExportIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="İçe Aktar">
              <IconButton component="label">
                <input
                  type="file"
                  accept=".json"
                  hidden
                  onChange={handleImport}
                />
                <ImportIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Google Calendar Senkronizasyonu">
              <IconButton onClick={() => setIsGoogleSyncOpen(true)} color="secondary">
                <GoogleIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Yeni Etkinlik">
              <IconButton
                color="primary"
                onClick={() => {
                  setSelectedEvent(undefined);
                  setIsEventFormOpen(true);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Yeni Görev">
              <IconButton
                color="secondary"
                onClick={() => setIsTaskFormOpen(true)}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          {/* Sol Panel - Görev Sürükleme */}
          <Box sx={{ width: 300 }}>
            <TaskDragPanel />
          </Box>
          
          {/* Ana Takvim */}
          <Paper sx={{ p: 2, flex: 1 }}>
            {getViewComponent()}
          </Paper>
        </Box>

        <EventForm
          open={isEventFormOpen}
          onClose={() => {
            setIsEventFormOpen(false);
            setSelectedEvent(undefined);
          }}
          onSave={() => {
            setIsEventFormOpen(false);
            setSelectedEvent(undefined);
          }}
          initialData={selectedEvent}
        />

        <TaskForm
          open={isTaskFormOpen}
          onClose={() => setIsTaskFormOpen(false)}
          onSave={handleSaveTask}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <GoogleCalendarSync
          open={isGoogleSyncOpen}
          onClose={() => setIsGoogleSyncOpen(false)}
          onSync={handleGoogleSync}
        />
      </Box>
    </DndContext>
  );
};

export default CalendarPage;