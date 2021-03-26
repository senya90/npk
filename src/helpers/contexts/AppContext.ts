import React from "react";
import {ILocalStorageProvider} from "core/services/localStorageProvider/LocalStorageProviderTypes";
import {LocalStorageProvider} from "core/services/localStorageProvider/LocalStorageProvider";
import {INotificationService} from "../../core/services/notificationService/NotificationServiceTypes";
import {NotificationService} from "../../core/services/notificationService/NotificationService";
import { store } from "core/redux/store";
import {IUserService} from "../../core/services/userService/UserServiceTypes";
import {UserService} from "../../core/services/userService/UserService";
import { Locale } from "helpers/translate/translate";

export type AppContextType = {
    localStorageProvider: ILocalStorageProvider
    userService: IUserService
    notificationService: INotificationService

    onChangeLocale: (locale: Locale) => void
}

export const AppContext = React.createContext<AppContextType>({
    localStorageProvider: new LocalStorageProvider(),
    userService: new UserService(store.dispatch, new LocalStorageProvider()),
    notificationService: new NotificationService(store.dispatch),

    onChangeLocale(locale: Locale): void {
    }
})