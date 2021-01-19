import React, {FC} from 'react';
import {SignInProps} from "./SignInTypes";
import { Tabs, TabPane } from 'molecule/tabs/Tabs';
import {Login} from "template/login/Login";
import {Registration} from "template/registration/Registration";
import {translate} from "helpers/translate/translate";
import style from './signIn.module.scss'

const SignIn: FC<SignInProps> = ({...rest}) => {

    const tabChange = (activeKey: string) => {
        rest.history.push(activeKey)
    }

    const path = rest.location.pathname

    return (
        <div className={style.signInWrapper}>
            <Tabs
                defaultActiveKey={path}
                centered
                onChange={tabChange}
            >
                <TabPane tab={translate('login')} key="/login">
                    <div className={style.tab}>
                        <Login {...rest}/>
                    </div>
                </TabPane>
                <TabPane tab={translate('registration')} key="/registration">
                    <div className={style.tab}>
                        <Registration/>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export {SignIn}