import {
  useNotifications,
  Notification,
} from '../notifications';

const notification = {
  id: '123',
  title: 'Hello World',
  type: 'info',
  message: 'This is a notification',
} as Notification;

describe('notifications store', () => {
  it('should show and dismiss notifications', () => {
    expect(
      useNotifications.getState().notifications.length
    ).toBe(0);

    useNotifications
      .getState()
      .showNotification(notification);

    expect(
      useNotifications.getState().notifications
    ).toContainEqual(notification);

    useNotifications
      .getState()
      .dismissNotification(notification.id);

    expect(
      useNotifications.getState().notifications
    ).not.toContainEqual(notification);
  });
});
