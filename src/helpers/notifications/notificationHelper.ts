import {TNotification} from "../../core/redux/notificationsSlice";
import {TError} from "../../models/error";

export const NotificationHelper = {
    getError(message: string | TError): TNotification {
        if (typeof message === "string") {
            return {
                message,
                type: "ERROR"
            }
        }

        const errorTextByCode: string = String(message.code)

        return {
            message: errorTextByCode,
            type: "ERROR"
        }
    },

    getInfo(message: string): TNotification {
        return {
            message,
            type: "INFO"
        }
    },

    getSuccess(message: string): TNotification {
        return {
            message,
            type: "SUCCESS"
        }
    },

    getWarning(message: string | TError): TNotification {
        if (typeof message === "string") {
            return {
                message,
                type: "WARNING"
            }
        }

        const warningText: string = String(message.code)

        return {
            message: warningText,
            type: "WARNING"
        }
    }
}