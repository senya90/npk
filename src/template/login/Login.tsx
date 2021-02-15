import React, {FC, useContext, useState} from 'react';
import {connect} from 'react-redux';
import qs from 'qs'

import Title from 'atom/title/Title';
import {translate} from "helpers/translate/translate";
import {Input} from "atom/input/Input";
import {isExist, notEmptyString} from "helpers/utils";
import style from './login.module.scss'
import { Button } from 'atom/button/Button';
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {AppContext} from "helpers/contexts/AppContext";
import {LoginProps} from "./LoginTypes";


const LoginComponent: FC<LoginProps> = (props) => {
    const {
        localStorageProvider,
        userService,
        notificationService
    } = useContext(AppContext)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isExist(event)) {
            setLogin(event.target.value)
        }
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isExist(event)) {
            setPassword(event.target.value)
        }
    }

    const onSubmit = async () => {
        if (notEmptyString(login) && notEmptyString(password)) {
            try {
                const response = await loginApi(login, password)
                if (response.data.error) {
                    localStorageProvider.clearTokens()
                    return
                }

                if (response.data && response.data.data) {
                    userService.updateTokens(response.data.data)
                    props.history.push(getPathForRedirect())
                }
            } catch (err) {
                notificationService.notifySomethingWrong(err)
                localStorageProvider.clearTokens()
            }
        }
    }

    const getPathForRedirect = (): string => {
        if (props.location.search) {
            let decode = decodeURI(props.location.search)
            if (decode.indexOf('?') === 0) {
                decode = decode.slice(1)
            }
            const parsed = qs.parse(decode)
            if (parsed.targetPath) {
                return String(parsed.targetPath)
            }
            return '/'
        }

        return '/'
    }

    const loginApi = async (login: string, password: string): Promise<any> => {
        return await API.post(ApiURL.login, {login, password})
    }

    return (
        <div>
            <Title bottomMargin={"little"}>{translate('login')}</Title>
            <form className={style.form}>
                <Input
                    value={login}
                    onChange={changeLogin}
                    className={style.input}
                    placeholder={translate('loginName')}
                    mode={"borderBottom"}
                />
                <Input
                    value={password}
                    onChange={changePassword}
                    className={style.input}
                    placeholder={translate('password')}
                    password
                    mode={"borderBottom"}
                />
                <Button
                    containerclass={style.formButton}
                    type={"primary"}
                    onClick={onSubmit}
                >
                    {translate('login')}
                </Button>
            </form>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

const Login = connect(mapStateToProps)(LoginComponent)

export {Login}