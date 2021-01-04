import React, {useCallback, useState} from 'react';
import Title from 'atom/title/Title';
import {translate} from "helpers/translate/translate";
import {Input} from "atom/input/Input";
import {isExist} from "helpers/utils";
import style from './login.module.scss'
import { Button } from 'atom/button/Button';

const Login = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const changeLogin = useCallback(
        (event) => {
            if (isExist(event)) {
                setLogin(event.target.target)
            }
        }, []
    )

    const changePassword = useCallback(
        (event) => {
            if (isExist(event)) {
                setPassword(event.target.target)
            }
        }, []
    )

    return (
        <div>
            <Title className={style.title}>{translate('login')}</Title>
            <form className={style.form}>
                <Input
                    value={login}
                    onChange={changeLogin}
                    className={style.input}
                    placeholder={translate('loginName')}
                />
                <Input
                    value={password}
                    onChange={changePassword}
                    className={style.input}
                    placeholder={translate('password')}
                    password
                />
                <Button
                    containerclass={style.formButton}
                    type={"primary"}
                >
                    {translate('login')}
                </Button>
            </form>
        </div>
    );
};

export {Login}