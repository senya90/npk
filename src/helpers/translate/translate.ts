import localisation from './localisation.json'

export const translate = (text: string) => {
    const language = 'ru'
    const loc: any = localisation
    
    if (loc[text]) {
        return loc[text][language]
    }

    return text
}