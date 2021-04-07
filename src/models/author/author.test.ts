import {Author} from './author'

describe('Author model', () => {

    describe('deleteIdentical', () => {

        it('identical authors, one address', () => {
            const authors: Author[] = [
                new Author('a1', '', 'src1', ''),
                new Author('a2', '', 'src1', ''),
                new Author('a3', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', '')
            ]

            expect(Author.deleteIdentical(authors)).toEqual([
                new Author('a1', '', 'src1', ''),
                new Author('a2', '', 'src1', ''),
                new Author('a3', '', 'src1', ''),
            ])
        })

        it('identical authors, different address', () => {
            const authors = [
                new Author('a1', '', 'src1', ''),
                new Author('a2', '', 'src1', ''),
                new Author('a3', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src2', ''),
                new Author('a1', '', 'src2', ''),
                new Author('a3', '', 'src2', ''),
            ]

            expect(Author.deleteIdentical(authors)).toEqual([
                new Author('a1', '', 'src1', ''),
                new Author('a2', '', 'src1', ''),
                new Author('a3', '', 'src1', ''),
                new Author('a1', '', 'src2', ''),
                new Author('a3', '', 'src2', ''),
            ])
        })

        it('multi', () => {
            const authors = [
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', ''),
                new Author('a1', '', 'src1', '')
            ]

            expect(Author.deleteIdentical(authors)).toEqual([
                new Author('a1', '', 'src1', '')
            ])
        })

        it('one author', () => {
            const authors = [
                new Author('a3', '', 'src1', '')
            ]

            expect(Author.deleteIdentical(authors)).toEqual([
                new Author('a3', '', 'src1', '')
            ])
        })

        it('empty array', () => {
            expect(Author.deleteIdentical([])).toEqual([])
        })

    })
})