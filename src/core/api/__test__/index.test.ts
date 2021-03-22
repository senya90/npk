import {API} from '../index'
import {request} from "../request";
import {ErrorResponse} from "../../../models/_types/serverResponse";

describe('API index', () => {

    const getResolved = (data?: any, error?: ErrorResponse, headers?: any) => {
        return jest.fn(() => {
            return new Promise<any>((resolve) => {
                resolve({
                    data: {
                        data,
                        error,
                        headers
                    }
                })
            })
        })
    }

    const getRejected = () => {
        return jest.fn(() => {
            return new Promise<any>((resolve, reject) => {
                reject()
            })
        })
    }

    let postRequestMock: jest.Mock;
    let postAuthorizedRequestMock: jest.Mock;
    let getRequestMock: jest.Mock;
    let notifyMock: jest.Mock;
    let notifyWrongMock: jest.Mock;


    beforeEach(() => {
        notifyMock = jest.fn()
        API.notificationService.notify = notifyMock

        notifyWrongMock = jest.fn()
        API.notificationService.notifySomethingWrong = notifyWrongMock
    })

    afterEach(() => {
        postRequestMock.mockClear()
        notifyMock.mockClear()
        notifyWrongMock.mockClear()
    })

    describe('post', () => {

        beforeEach(() => {
            postRequestMock = getResolved()
            request.post = postRequestMock
        })

        it('correct url', async () => {
            await API.post('http://some-url')

            expect(postRequestMock.mock.calls[0]).toEqual(['http://some-url', undefined, undefined])
            expect(postRequestMock).toHaveBeenCalledTimes(1)
        })

        it('with data', async () => {
            await API.post('http://some-url', {field: ['a', 'b']})

            expect(postRequestMock.mock.calls[0]).toEqual(['http://some-url', {field: ['a', 'b']}, undefined])
            expect(postRequestMock).toHaveBeenCalledTimes(1)
        })

        it('with error', async () => {
            postRequestMock = getResolved(
                {},
                {text: '', message: '', code: 1}
            )
            request.post = postRequestMock

            await API.post('http://some-url', {field: ['a', 'b']})
            await API.post('http://some-url', {field: ['a', 'b']})

            expect(API.notificationService.notify).toHaveBeenCalledTimes(2)
        })

        it('with exception', async () => {
            request.post = getRejected()

            try {
                await API.post('http://some-url', {field: ['a', 'b']})
                expect('').toEqual('falsy branch')
                expect('').toEqual('falsy branch')
            } catch (err) {
                expect(API.notificationService.notifySomethingWrong).toHaveBeenCalledTimes(1)
            }
        })

    })

    describe('get', () => {

        beforeEach(() => {
            getRequestMock = getResolved()
            request.get = getRequestMock
        })

        it('correct url', async () => {
            await API.get('http://some-url')

            expect(getRequestMock.mock.calls[0]).toEqual(['http://some-url', undefined, undefined])
            expect(getRequestMock).toHaveBeenCalledTimes(1)
        })

        it('with data', async () => {
            await API.get('http://some-url', {field: ['a', 'b']}, {Authorization: 'Bearer 8n878tb-tg6n9'})

            expect(getRequestMock.mock.calls[0]).toEqual([
                'http://some-url',
                {field: ['a', 'b']},
                {Authorization: 'Bearer 8n878tb-tg6n9'}
            ])
            expect(getRequestMock).toHaveBeenCalledTimes(1)
        })

        it('with exception', async () => {
            request.get = getRejected()

            try {
                await API.get('http://some-url', {field: ['a', 'b']})
                expect('').toEqual('falsy branch')
                expect('').toEqual('falsy branch')
            } catch (err) {
                expect('true branch').toEqual('true branch')
            }
        })
    })

})