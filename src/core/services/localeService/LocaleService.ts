import {setTranslateLocale, Locale} from "../../../helpers/translate/translate";
import {setLocale} from "../../redux/localeSlice";
import {ILocalStorageProvider} from "../localStorageProvider/LocalStorageProviderTypes";
import { ILocaleService } from "./LocaleServiceTypes";

export class LocaleService implements ILocaleService {
    private readonly dispatch: any
    private readonly localStorageProvider: ILocalStorageProvider

    constructor(dispatch: any, localStorageProvider: ILocalStorageProvider) {
        this.dispatch = dispatch
        this.localStorageProvider = localStorageProvider
    }

    setLocale(locale: Locale) {
        this.dispatch(setLocale(locale))
        this.localStorageProvider.saveLocale(locale)
        this.switchTranslateTo(locale)
    }

    switchTranslateTo(locale: Locale): void {
        setTranslateLocale(locale)
    }
}