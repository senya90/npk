import {TNotification} from "../../core/redux/notificationsSlice";
import {TError} from "../../models/error";
import {translate} from "../translate/translate";

export const NotificationHelper = {
    getError(error: string | TError): TNotification {
        if (typeof error === "string") {
            return {
                message: error,
                type: "ERROR"
            }
        }

        const errorTextByCode: string = getErrorTextByCode(error)

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

    getWarning(error: string | TError): TNotification {
        if (typeof error === "string") {
            return {
                message: error,
                type: "WARNING"
            }
        }

        const warningText: string = getErrorTextByCode(error)

        return {
            message: warningText,
            type: "WARNING"
        }
    }
}

function getErrorTextByCode(error: TError): string {
    if (!error || !error.code) {
        return error.text
    }

    return translate(String(error.code))
}