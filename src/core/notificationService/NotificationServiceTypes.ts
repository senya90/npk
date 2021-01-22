import {TNotification} from "../redux/notificationsSlice";

export interface INotificationService {
    notify: (notification: TNotification) => void
    notifySomethingWrong: (error?: any) => void
    clearNotification: () => void
}