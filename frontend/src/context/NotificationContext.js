'use client';
import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([

    { id: 1, title: 'Welcome!', desc: 'System is ready.', time: 'Just now', type: 'info', read: false }
  ]);

  const addNotification = (title, desc, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      desc,
      time: 'Just now',
      type,
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}