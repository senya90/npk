import React, {FC} from 'react';
import cn from 'classnames'
import {SignInProps} from "./SignInTypes";
import { Tabs, TabPane } from 'components/molecule/tabs/Tabs';
import {Login} from "components/template/login/Login";
import {Registration} from "components/template/registration/Registration";
import {translate} from "helpers/translate/translate";
import style from './signIn.module.scss'
import { ROUTES } from 'core/routes/routes';
import wrapperStyle from 'components/atom/mainWrapper/mainWrapper.module.scss'
import {Helmet} from "react-helmet";


const SignIn: FC<SignInProps> = ({...rest}) => {

    const tabChange = (activeKey: string) => {
        rest.history.push(activeKey)
    }

    const path = rest.location.pathname
    const headTitle = path === ROUTES.LOGIN ? translate('helmetLoginTitle') : translate('helmetRegistrationTitle')

    return (
        <div className={cn(style.signInWrapper, wrapperStyle.mainWrapper)}>
            <Helmet>
                <title>{headTitle}</title>
                <meta name="keywords" content={`Add fertilizers, make solutions, grow plants. Добавляйте удобрения, создавайте растворы, выращивайте растения`} />
                <meta name="keywords" content={`growing, growing plants, npk, npk calculator, fertilizers, fertilizer, solution, micro elements, macronutrients, nutritions, how to fertilize plants, nitrogen, potassium, phosphorus, calcium, magnesium, how to use npk calculator, выращивание, выращивание растений, нпк, нпк кальулятор, удобрения, удобрение, раствор, микроэлементы, макроэлементы, подкормка, как удобрять растения, азот, калий, фосфор, кальций, магний, как пользоваться нпк калькулятором`} />
            </Helmet>
            <Tabs
                activeKey={path}
                defaultActiveKey={ROUTES.LOGIN}
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
                        <Registration {...rest}/>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export {SignIn}