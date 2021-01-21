import { INotificationService } from "./NotificationServiceTypes";
import {clearNotification, setNotification, TNotification} from "core/redux/notificationsSlice";

export class NotificationService implements INotificationService {

    private readonly dispatch: any

    constructor(dispatch: any) {
        this.dispatch = dispatch
    }

    clearNotification(): void {
        this.dispatch(clearNotification())
    }

    notify(notification: TNotification): void {
        this.dispatch(setNotification(notification))
    }
}