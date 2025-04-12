import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface UseNotificationReturn {
  notifications: Notification[];
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export function useNotification(): UseNotificationReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (type: NotificationType, message: string, duration = 5000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = { id, type, message, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
    clearNotifications,
  };
}

// Example usage:
// const { notifications, showNotification, removeNotification } = useNotification();
//
// // Show a success notification
// showNotification('success', 'Operation completed successfully');
//
// // Show an error notification
// showNotification('error', 'An error occurred', 10000);
//
// // Show a warning notification
// showNotification('warning', 'Please review your input');
//
// // Show an info notification
// showNotification('info', 'New updates available'); 