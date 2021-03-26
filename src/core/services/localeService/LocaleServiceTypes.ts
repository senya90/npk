import { Locale } from "helpers/translate/translate";

export interface ILocaleService {
    setLocale: (locale: Locale) => void
    switchTranslateTo: (locale: Locale) => void
}