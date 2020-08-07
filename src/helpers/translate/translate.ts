import localisation from './localisation.json'

export const translate = (text: string) => {
    const language = 'ru'
    // @ts-ignore
    if (localisation[text]) {
        // @ts-ignore
        return localisation[text][language]
    }

    return text
}