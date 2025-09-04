import React from 'react';

interface NotificationPanelProps {
  notifications: any[];
  onRemoveNotification: (id: number) => void;
}

export default function NotificationPanel({ notifications, onRemoveNotification }: NotificationPanelProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="clean-card p-4 bg-card/95 backdrop-blur-sm border-l-4 border-l-primary max-w-sm animate-slide-in-right"
          style={{
            animation: 'slideInRight 0.3s ease-out, fadeOut 0.3s ease-out 4.7s forwards'
          }}
        >
          <p className="text-sm font-medium text-foreground">{notification.message}</p>
          <button
            onClick={() => onRemoveNotification(notification.id)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}