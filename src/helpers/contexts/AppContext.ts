import React from "react";
import {ILocalStorageProvider} from "core/localStorageProvider/LocalStorageProviderTypes";
import {LocalStorageProvider} from "core/localStorageProvider/LocalStorageProvider";
import {TokensPair} from "../../models/tokensPair";

export type AppContextType = {
    localStorageProvider: ILocalStorageProvider
    tokens?: TokensPair
}

export const AppContext = React.createContext<AppContextType>({
    localStorageProvider: new LocalStorageProvider(),
    tokens: undefined
})