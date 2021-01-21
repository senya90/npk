import {TNotification} from "../redux/notificationsSlice";

export interface INotificationService {
    notify: (notification: TNotification) => void
    clearNotification: () => void
}