import { useState, useEffect } from 'react';
import { NOTIFICATION_TEMPLATES } from '../constants/navigation';

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomNotification = NOTIFICATION_TEMPLATES[Math.floor(Math.random() * NOTIFICATION_TEMPLATES.length)];
        const notification = {
          id: Date.now(),
          ...randomNotification
        };
        setNotifications(prev => [...prev.slice(-2), notification]);
      }
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, []);

  return { notifications, setNotifications };
}