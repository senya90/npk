import React, {useState} from 'react';
import {translate} from "helpers/translate/translate";
import Title from "atom/title/Title";
import style from "./registration.module.scss";
import {Input} from "atom/input/Input";
import {Button} from "atom/button/Button";

const Registration = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const onSubmit = () => {
        console.log('sendregistration')
    }

    return (
        <div>
            <Title bottomMargin={"little"}>{translate('registration')}</Title>
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
                <Input
                    value={confirmPassword}
                    onChange={changeConfirmPassword}
                    className={style.input}
                    placeholder={translate('confirmPassword')}
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

export {Registration}