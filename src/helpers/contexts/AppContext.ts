import React from "react";
import {ILocalStorageProvider} from "core/localStorageProvider/LocalStorageProviderTypes";
import {LocalStorageProvider} from "core/localStorageProvider/LocalStorageProvider";
import {TokensPair} from "../../models/tokensPair";
import {INotificationService} from "../../core/notificationService/NotificationServiceTypes";
import {NotificationService} from "../../core/notificationService/NotificationService";
import { store } from "core/redux/store";

export type AppContextType = {
    localStorageProvider: ILocalStorageProvider
    updateTokensApp: (tokens: TokensPair) => void
    notificationService: INotificationService
}

export const AppContext = React.createContext<AppContextType>({
    localStorageProvider: new LocalStorageProvider(),
    updateTokensApp: () => {
    },
    notificationService: new NotificationService(store.dispatch)
})