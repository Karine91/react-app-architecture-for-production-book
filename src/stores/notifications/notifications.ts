import { create } from 'zustand';

import { uid } from '@/utils/uid';

import createSelectors from './selectors';

export type NotificationType =
  | 'info'
  | 'warning'
  | 'success'
  | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  duration?: number;
  message?: string;
};

export interface NotificationsStore {
  notifications: Notification[];
  showNotification: (
    notification: Omit<Notification, 'id'>
  ) => void;
  dismissNotification: (id: string) => void;
}

export const createNotificationsStore =
  create<NotificationsStore>()((set, get) => ({
    notifications: [],
    showNotification: (notification) => {
      const id = uid();
      set((state) => ({
        notifications: [
          ...state.notifications,
          { id, ...notification },
        ],
      }));
      if (notification.duration) {
        setTimeout(() => {
          get().dismissNotification(id);
        }, notification.duration);
      }
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
      }));
    },
  }));

export const useNotifications = createSelectors(
  createNotificationsStore
);
