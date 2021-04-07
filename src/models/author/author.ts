import {isEmptyArray} from "../../helpers/utils";

export class Author {
    name: string
    authorLink: string
    source: string
    sourceLink: string

    constructor(name: string, authorLink: string, source: string, sourceLink: string) {
        this.name = name;
        this.authorLink = authorLink;
        this.source = source;
        this.sourceLink = sourceLink;
    }

    static getCustomIconsAuthors(customIcons: any): Author[] {
        const authorsAndLinks: Author[] = []

        for (const key in customIcons) {
            if (customIcons.hasOwnProperty(key)) {
                authorsAndLinks.push(customIcons[key].author)
            }
        }

        return authorsAndLinks
    }

    static deleteIdentical(authors: Author[]): Author[] {
        if (isEmptyArray(authors)) {
            return []
        }

        const withoutDoubles: Author[] = [authors[0]]

        for (let i = 0; i < authors.length; i++) {
            let isHere = false

            for (let j = 0; j < withoutDoubles.length; j++) {
                if (authors[i].name === withoutDoubles[j].name && authors[i].source === withoutDoubles[j].source) {
                    isHere = true
                }
            }

            if (!isHere) {
                withoutDoubles.push(authors[i])
            }
        }

        return withoutDoubles
    }
}