import React, {useContext, useState} from 'react';
import Title from 'atom/title/Title';
import {translate} from "helpers/translate/translate";
import {Input} from "atom/input/Input";
import {isExist, notEmptyString} from "helpers/utils";
import style from './login.module.scss'
import { Button } from 'atom/button/Button';
import {API} from "../../core/api";
import {ApiURL} from "../../core/api/ApiURL";
import {AppContext} from "../../helpers/contexts/AppContext";
import {connect, useDispatch} from 'react-redux';
import { setTokens } from 'core/redux/userSlice';

const LoginComponent = () => {
    const dispatch = useDispatch()
    const {localStorageProvider} = useContext(AppContext)
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
                    console.log(response.data.error)
                    console.log(response.data.error.message)
                    localStorageProvider.clearTokens()
                    return
                }

                if (response.data && response.data.data) {
                    dispatch(setTokens(response.data.data))
                    localStorageProvider.saveTokens(response.data.data)
                }
            } catch (e) {
                console.log('err', e)
                console.log(e.data)
                localStorageProvider.clearTokens()
            }
        }
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