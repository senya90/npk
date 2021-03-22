import {translate} from '../translate'

describe('Localisation translate', () => {

    it('translate', () => {
        expect(translate("save")).toEqual("Сохранить")
    })

    it('translate nonexistent\n', () => {
        expect(translate("sav-eee-eee")).toEqual("sav-eee-eee")
    })
})
