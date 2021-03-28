import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Switch, Route } from 'react-router-dom';

import {Calculator} from "components/template/calculator/Calculator";
import { Home } from 'components/template/home/Home';
import { Header } from 'components/template/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'components/pages/signIn/SignIn';
import {NotificationBar} from "../components/organism/notificationBar/NotificationBar";
import {LocalStorageProvider} from "core/services/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';
import style from './App.module.scss'
import {PrivateRoute} from "core/privateRoute/PrivateRoute";
import {useDispatch, useSelector} from 'react-redux';
import {NotificationService} from "core/services/notificationService/NotificationService";
import {UserService} from "../core/services/userService/UserService";
import {IUserService} from "../core/services/userService/UserServiceTypes";
import {Locale} from 'helpers/translate/translate';
import {LocaleService} from "../core/services/localeService/LocaleService";
import {ILocaleService} from "../core/services/localeService/LocaleServiceTypes";
import {Footer} from "../components/template/footer/Footer";


const App = () => {
    const dispatch = useDispatch()
    const forceUpdate = useState<object>({})
    const setForceUpdate = forceUpdate[1]
    const locale = useSelector((state: any) => state.locale.locale)


    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])

    const notificationService = useMemo(() => {
        return new NotificationService(dispatch)
    }, [dispatch])

    const userService: IUserService = useMemo(() => {
        return new UserService(dispatch, new LocalStorageProvider())
    }, [dispatch])

    const localeService: ILocaleService = useMemo(() => {
        return new LocaleService(dispatch, new LocalStorageProvider())
    }, [dispatch])

    useEffect(() => {
        localeService.switchTranslateTo(locale)
    }, [locale, localeService])

    useEffect(() => {
        userService.setAuthByStorage()
    }, [userService])

    const onNotificationHide = useCallback(() => {
        notificationService.clearNotification()
    }, [notificationService])

    const onChangeLocale = (locale: Locale) => {
        localeService.setLocale(locale)
        callForceUpdate()
    }

    const callForceUpdate = () => setForceUpdate({})

    return (
        <div style={{overflow: 'hidden', height: '100%'}}>
            <AppContext.Provider value={{
                localStorageProvider: localStorageProvider,
                userService: userService,
                notificationService: notificationService,
                onChangeLocale
            }}>
                <Header/>
                <div className={style.container}>
                    <Switch>
                        <Route exact component={Home} path={ROUTES.HOME_PAGE}/>
                        <Route component={SignIn} path={ROUTES.LOGIN}/>
                        <Route component={SignIn} path={ROUTES.REGISTRATION}/>
                        <PrivateRoute component={Calculator} path={ROUTES.CALCULATOR}/>
                    </Switch>
                </div>
                <Footer/>
                <NotificationBar
                    onNotificationHide={onNotificationHide}
                />
            </AppContext.Provider>
        </div>
    );
}

export {App}
