import React, {FC, useState} from 'react';
import {translate} from "helpers/translate/translate";
import {Title} from "components/atom/title/Title";
import style from "./registration.module.scss";
import {Input} from "components/atom/input/Input";
import {Button} from "components/atom/button/Button";
import {notEmptyString} from "../../../helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {RegistrationProps} from "./RegistrationTypes";
import {ROUTES} from "../../../core/routes/routes";

const Registration: FC<RegistrationProps> = (props) => {
    const SUCCESS_REGISTRATION_TIMEOUT = 3000
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [successRegistration, setSuccessRegistration] = useState<boolean>(false)

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isValid = validate()
        if (isValid) {
            const response = await registrationApi(login, password)
            if (response.data.error) {
                console.log(response.data.error)
                console.log(response.data.error.message)
                return
            }

            if (response.data && response.data.data) {
                onSuccessRegistration()
            }
        }
    }

    const onSuccessRegistration = () => {
        setSuccessRegistration(true)
        _clearForm()
        const timeout = setTimeout(() => {
            clearTimeout(timeout)
            setSuccessRegistration(false)
            props.history.push(ROUTES.LOGIN)

        }, SUCCESS_REGISTRATION_TIMEOUT)
    }

    const _clearForm = () => {
        setLogin('')
        setPassword('')
        setConfirmPassword('')
    }

    const registrationApi = async (login: string, password: string): Promise<any> => {
        return await API.post(ApiURL.registration, {login, password})
    }

    const validate = (): boolean => {
        return notEmptyString(login) && notEmptyString(password) && notEmptyString(confirmPassword) && password === confirmPassword

    }

    return (
        <div>

            {successRegistration ?
                <div className={style.successRegistration}>{translate('haveBeenRegistered')}</div>
                :
                <>
                    <Title bottomMargin={"little"}>{translate('registration')}</Title>
                    <form className={style.form} onSubmit={onSubmit}>
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
                            className={style.formButton}
                            type={"primary"}
                            htmlType={"submit"}
                        >
                            {translate('registration')}
                        </Button>
                    </form>
                </>
            }
        </div>
    );
};

export {Registration}