import {TokenHelper} from '../index'
import jwt from 'jsonwebtoken'
import { API } from 'core/api'
import {ServerResponse} from "../../../models/_types/serverResponse";
import {TokensPair} from "../../../models/_types/tokensPair";
import { User } from 'models/_types/user';

describe('TokenHelper', function () {

    describe('isActive', function () {

        let jwtDecodeMock: jest.Mock
        let dateNowMock: jest.Mock

        const getJwtDateDecodeMock = (date: string) => {
            const MILLISECONDS_TO_SECONDS = 1000
            return jest.fn(() => {
                return {
                    exp: new Date(date).valueOf() / MILLISECONDS_TO_SECONDS
                }
            })
        }

        const getFailedJwtDecodeMock = () => {
            return jest.fn((): User | null => {
                return null
            })
        }

        const getDateNowMock = (date: string) => {
            return jest.fn(() => {
                return new Date(date).valueOf()
            })
        }

        beforeEach(() => {
            jwtDecodeMock = getJwtDateDecodeMock("1.1.2020")
            jwt.decode = jwtDecodeMock

            dateNowMock = getDateNowMock("1.1.2019")
            Date.now = dateNowMock
        })

        afterEach(() => {
            jwtDecodeMock.mockClear()
            dateNowMock.mockClear()
        })

        it('wrong token format' , function () {
            jwtDecodeMock = getFailedJwtDecodeMock()
            jwt.decode = jwtDecodeMock

            expect(TokenHelper.isActive('qwerty')).toBeFalsy()
        })

        it('not expired', () => {
            jwtDecodeMock = getJwtDateDecodeMock("10.10.2020")
            jwt.decode = jwtDecodeMock

            dateNowMock = getDateNowMock("5.10.2020")
            Date.now = dateNowMock

            const isActive = TokenHelper.isActive('')

            expect(isActive).toBeTruthy()
        })

        it('is expired', () => {
            jwtDecodeMock = getJwtDateDecodeMock("10.10.2020")
            jwt.decode = jwtDecodeMock

            dateNowMock = getDateNowMock("11.10.2020")
            Date.now = dateNowMock

            const isActive = TokenHelper.isActive('')

            expect(isActive).toBeFalsy()
        })
    })

    describe('updateTokens', () => {
        let apiPostMock: jest.Mock;

        const getSuccessUpdateMock = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise(resolve => {
                    const responseData: ServerResponse<TokensPair | undefined> = {
                        data: {
                            error: null,
                            data: {accessToken: '', refreshToken: ''},
                            status: 1
                        }
                    }
                    resolve(responseData)
                })
            })
        }

        const getFailedUpdateMock = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise(resolve => {
                    const responseData: ServerResponse<TokensPair | undefined> = {
                        data: {
                            error: null,
                            data: undefined,
                            status: 1
                        }
                    }
                    resolve(responseData)
                })
            })
        }

        beforeEach(() => {
            apiPostMock = getSuccessUpdateMock()
            API.post = apiPostMock
        })

        afterEach(() => {
            apiPostMock.mockClear()
        })

        it('success update', async () => {
            const tokenPair = await TokenHelper.updateTokens('')

            if (tokenPair) {
                expect(tokenPair.accessToken).toEqual('')
                expect(tokenPair.refreshToken).toEqual('')
                return
            }
        })

        it('failed update', async () => {
            apiPostMock = getFailedUpdateMock()
            API.post = apiPostMock

            const tokenPair = await TokenHelper.updateTokens('')

            expect(tokenPair).toBeUndefined()
        })
    })

    describe('getUser', () => {

        let jwtDecodeMock: jest.Mock

        const getSuccessUserMock = () => {
            return jest.fn((): User | null => {
                return {
                    role: "user",
                    userId: '12345',
                    login: 'loginName'
                }
            })
        }

        const getFailedUserMock = () => {
            return jest.fn((): User | null => {
                return null
            })
        }

        beforeEach(() => {
            jwtDecodeMock = getSuccessUserMock()
            jwt.decode = jwtDecodeMock
        })

        afterEach(() => {
            jwtDecodeMock.mockClear()
        })

        it('failed', () => {
            jwtDecodeMock = getFailedUserMock()
            jwt.decode = jwtDecodeMock
            expect(TokenHelper.getUser('')).toBeNull()
        })

        it('get user data', () => {
            const user = TokenHelper.getUser('')

            if (user) {
                expect(user.role).toEqual('user')
                expect(user.userId).toEqual('12345')
            }
        })
    })
})