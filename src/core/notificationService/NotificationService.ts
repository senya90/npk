import { INotificationService } from "./NotificationServiceTypes";
import {clearNotification, setNotification, TNotification} from "core/redux/notificationsSlice";
import {NotificationHelper} from "../../helpers/notifications/notificationHelper";
import {translate} from "../../helpers/translate/translate";

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

    notifySomethingWrong(error: any): void {
        if (error) {
            console.error(error)
        }

        const errorNotification = NotificationHelper.getError(translate('somethingWrong'))
        this.dispatch(setNotification(errorNotification))

    }
}