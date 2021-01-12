import React, {FC} from 'react';
import {SignInProps} from "./SignInTypes";
import { Tabs, TabPane } from 'molecule/tabs/Tabs';
import {Login} from "template/login/Login";
import {Registration} from "template/registration/Registration";
import {translate} from "helpers/translate/translate";
import style from './signIn.module.scss'

const SignIn: FC<SignInProps> = (props) => {

    return (
        <div className={style.signInWrapper}>
            <Tabs defaultActiveKey="login" centered>
                <TabPane tab={translate('login')} key="login">
                    <div className={style.tab}>
                        <Login/>
                    </div>
                </TabPane>
                <TabPane tab={translate('registration')} key="registration">
                    <div className={style.tab}>
                        <Registration/>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export {SignIn}