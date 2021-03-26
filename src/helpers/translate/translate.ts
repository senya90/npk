import localisation from './localisation.json'

export type Locale = 'en' | 'ru'

let currentLanguage: Locale = "en"

export const translate = (text: string) => {
    const loc: any = localisation
    
    if (loc[text]) {
        return loc[text][currentLanguage]
    }

    return text
}

export const setTranslateLocale = (locale: Locale) => {
    currentLanguage = locale
}

export const getLocale = (): Locale => {
    return currentLanguage
}