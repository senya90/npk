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
}