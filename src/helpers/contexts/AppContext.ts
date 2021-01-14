import React from "react";
import {ILocalStorageProvider} from "core/localStorageProvider/LocalStorageProviderTypes";
import {LocalStorageProvider} from "core/localStorageProvider/LocalStorageProvider";

export type AppContextType = {
    localStorageProvider: ILocalStorageProvider
}

export const AppContext = React.createContext<AppContextType>({
    localStorageProvider: new LocalStorageProvider(),
})