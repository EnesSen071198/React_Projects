import { Store } from '@reduxjs/toolkit';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { Store as NotificationStore } from 'react-notifications-component';
import { CalendarEvent } from '../types/calendar';
import { RootState } from '../store';

class ReminderService {
  private static instance: ReminderService;
  private store: Store;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor(store: Store) {
    this.store = store;
    this.startChecking();
  }

  public static getInstance(store: Store): ReminderService {
    if (!ReminderService.instance) {
      ReminderService.instance = new ReminderService(store);
    }
    return ReminderService.instance;
  }

  private startChecking(): void {
    // Her dakika kontrol et
    this.checkInterval = setInterval(() => {
      this.checkReminders();
    }, 60000);
  }

  private stopChecking(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private checkReminders(): void {
    const state = this.store.getState() as RootState;
    const events = state.calendar.events;
    const now = new Date();

    events.forEach(event => {
      if (event.extendedProps?.reminders) {
        event.extendedProps.reminders.forEach(reminder => {
          const eventStart = new Date(event.start);
          const reminderTime = addMinutes(eventStart, -reminder.minutes);

          // Hatırlatma zamanı geldi mi kontrol et
          if (
            isAfter(now, reminderTime) &&
            isBefore(now, addMinutes(reminderTime, 1)) // Son 1 dakika içinde
          ) {
            this.showNotification(event, reminder);
          }
        });
      }
    });
  }

  private showNotification(event: CalendarEvent, reminder: { type: string; minutes: number }): void {
    const title = event.title;
    const message = `${event.title} etkinliği ${reminder.minutes} dakika sonra başlayacak.`;

    NotificationStore.addNotification({
      title: title,
      message: message,
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    // Masaüstü bildirimi göster (tarayıcı izin verirse)
    if (reminder.type === 'desktop' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, {
              body: message,
              icon: '/favicon.ico',
            });
          }
        });
      }
    }
  }

  public addReminder(event: CalendarEvent, minutes: number, type: 'popup' | 'desktop' = 'popup'): void {
    const reminder = { type, minutes };
    const updatedEvent = {
      ...event,
      extendedProps: {
        ...event.extendedProps,
        reminders: [...(event.extendedProps?.reminders || []), reminder],
      },
    };

    // Redux store'u güncelle
    this.store.dispatch({
      type: 'calendar/updateEvent',
      payload: updatedEvent,
    });
  }

  public removeReminder(event: CalendarEvent, reminderIndex: number): void {
    if (!event.extendedProps?.reminders) return;

    const updatedReminders = [...event.extendedProps.reminders];
    updatedReminders.splice(reminderIndex, 1);

    const updatedEvent = {
      ...event,
      extendedProps: {
        ...event.extendedProps,
        reminders: updatedReminders,
      },
    };

    // Redux store'u güncelle
    this.store.dispatch({
      type: 'calendar/updateEvent',
      payload: updatedEvent,
    });
  }

  public destroy(): void {
    this.stopChecking();
  }
}

export default ReminderService;