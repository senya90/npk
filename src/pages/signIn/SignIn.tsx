import React, {FC} from 'react';
import {SignInProps} from "./SignInTypes";
import { Tabs, TabPane } from 'molecule/tabs/Tabs';
import {Login} from "template/login/Login";
import {Registration} from "organism/registration/Registration";
import {translate} from "helpers/translate/translate";
import style from './signIn.module.scss'

const SignIn: FC<SignInProps> = (props) => {

    return (
        <div className={style.signInWrapper}>
            <Tabs defaultActiveKey="login" centered>
                <TabPane tab={translate('login')} key="login">
                    <Login/>
                </TabPane>
                <TabPane  tab={translate('registration')} key="registration">
                    <Registration/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export {SignIn}