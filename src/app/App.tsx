import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Switch, Route } from 'react-router-dom';

import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {NotificationBar} from "../organism/notificationBar/NotificationBar";
import {LocalStorageProvider} from "core/services/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';
import styles from './App.module.css'
import {PrivateRoute} from "core/privateRoute/PrivateRoute";
import {useDispatch} from 'react-redux';
import {NotificationService} from "core/services/notificationService/NotificationService";
import {UserService} from "../core/services/userService/UserService";
import {IUserService} from "../core/services/userService/UserServiceTypes";
import {Locale, setLocale} from 'helpers/translate/translate';


const App = () => {
    const forceUpdate = useState<object>({})
    const setForceUpdate = forceUpdate[1]

    const dispatch = useDispatch()

    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])

    const notificationService = useMemo(() => {
        return new NotificationService(dispatch)
    }, [dispatch])

    const userService: IUserService = useMemo(() => {
        return new UserService(dispatch, new LocalStorageProvider())
    }, [dispatch])

    useEffect(() => {
        userService.setAuthByStorage()
    }, [userService])

    const onNotificationHide = useCallback(() => {
        notificationService.clearNotification()
    }, [notificationService])

    const onChangeLocale = (locale: Locale) => {
        setLocale(locale)
        callForceUpdate()
    }

    const callForceUpdate = () => {
        setForceUpdate({})
    }

    return (

            <div>
                <AppContext.Provider value={{
                    localStorageProvider: localStorageProvider,
                    userService: userService,
                    notificationService: notificationService,
                    onChangeLocale
                }}>
                    <Header/>
                    <div className={styles.container}>
                        <Switch>
                            <Route exact component={Home} path={ROUTES.MAIN_PAGE}/>
                            <Route component={SignIn} path={ROUTES.LOGIN}/>
                            <Route component={SignIn} path={ROUTES.REGISTRATION}/>
                            <PrivateRoute component={Calculator} path={ROUTES.CALCULATOR}/>
                        </Switch>
                    </div>
                    <NotificationBar
                        onNotificationHide={onNotificationHide}
                    />
                </AppContext.Provider>
            </div>


    );
}

export {App}
