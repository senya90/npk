import React, {useCallback, useEffect, useMemo} from 'react';
import { Switch, Route } from 'react-router-dom';

import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {NotificationBar} from "../organism/notificationBar/NotificationBar";
import {LocalStorageProvider} from "core/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';
import styles from './App.module.css'
import {PrivateRoute} from "core/privateRoute/PrivateRoute";
import {useDispatch} from 'react-redux';
import { setTokens, setUser } from 'core/redux/userSlice';
import {TokensPair} from "models/tokensPair";
import {NotificationService} from "core/notificationService/NotificationService";
import {TokenHelper} from "../helpers/tokens";


const App = () => {
    const dispatch = useDispatch()
    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])
    const notificationService = useMemo(() => {
        return new NotificationService(dispatch)
    }, [dispatch])


    const updateTokensApp = (tokens: TokensPair) => {
        if (tokens) {
            localStorageProvider.saveTokens(tokens)
            dispatch(setTokens(tokens))
            const user = TokenHelper.getUser(tokens.accessToken)
            if (user) {
                dispatch(setUser(user))
            }
        }
    }

    useEffect(() => {
        const tokens = localStorageProvider.getTokens()
        if (tokens) { // TODO: remove duplicate code through userService
            dispatch(setTokens(tokens))
            const user = TokenHelper.getUser(tokens.accessToken)
            if (user) {
                dispatch(setUser(user))
            }
        }
    }, [dispatch, localStorageProvider])

    const onNotificationHide = useCallback(() => {
        notificationService.clearNotification()
    }, [notificationService])

    return (

            <div>
                <AppContext.Provider value={{
                    localStorageProvider: localStorageProvider,
                    updateTokensApp: updateTokensApp,
                    notificationService: notificationService
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
