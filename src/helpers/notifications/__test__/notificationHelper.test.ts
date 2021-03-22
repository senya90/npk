import {NotificationHelper} from '../notificationHelper'
import {TError} from "../../../models/_types/error";

describe('NotificationHelper', () => {

    describe('getError', () => {

        it('right message', () => {
            const notification = NotificationHelper.getError('some error')

            expect(notification.message).toBe('some error')
        });

        it('right type', () => {
            const notification = NotificationHelper.getError('some error')

            expect(notification.type).toBe("ERROR")
        });

        it('special error type ', () => {
            const error: TError = {
                message: 'some error',
                code: 1,
                text: ''
            }

            const notification = NotificationHelper.getError(error)

            expect(notification).not.toBeUndefined()
            expect(notification).not.toBeNull()
        })

    })

    describe('getWarning', () => {

        it('right message', () => {
            const notification = NotificationHelper.getWarning('some warning')

            expect(notification.message).toBe('some warning')
        });

        it('right type', () => {
            const notification = NotificationHelper.getWarning('some warning')

            expect(notification.type).toBe("WARNING")
        });

        it('special error type ', () => {
            const error: TError = {
                message: 'some error',
                code: 1,
                text: ''
            }

            const notification = NotificationHelper.getWarning(error)

            expect(notification).not.toBeUndefined()
            expect(notification).not.toBeNull()
        })

    })

    describe('getErrorTextByCode', () => {

        it('null for code TError ', () => {
            const error: any | TError = {
                message: 'some error',
                code: null,
                text: 'Some error text'
            }

            const notification = NotificationHelper.getWarning(error)

            expect(notification.message).toEqual('Some error text')
        })
    })

    describe('simple methods', () => {
        const message = 'some text message'

        it('getInfo', () => {
            const notification = NotificationHelper.getInfo(message)

            expect(notification.message).toEqual(message)
            expect(notification.type).toEqual("INFO")
        })

        it('getSuccess', () => {
            const notification = NotificationHelper.getSuccess(message)

            expect(notification.message).toEqual(message)
            expect(notification.type).toEqual("SUCCESS")
        })
    })
})