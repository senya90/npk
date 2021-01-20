import React, {useEffect, useMemo} from 'react';
import { Switch, Route } from 'react-router-dom';

import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {NotificationBar} from "../organism/notificationBar/NotificationBar";
import {LocalStorageProvider} from "../core/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';
import styles from './App.module.css'
import {PrivateRoute} from "../core/privateRoute/PrivateRoute";
import {useDispatch} from 'react-redux';
import { setTokens } from 'core/redux/userSlice';
import {TokensPair} from "../models/tokensPair";


const App = () => {
    const dispatch = useDispatch()
    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])


    const updateTokensApp = (tokens: TokensPair) => {
        if (tokens) {
            localStorageProvider.saveTokens(tokens)
            dispatch(setTokens(tokens))
        }
    }

    useEffect(() => {
        const tokens = localStorageProvider.getTokens()
        if (tokens) {
            dispatch(setTokens(tokens))
        }
    }, [dispatch, localStorageProvider])

    return (

            <div>
                <AppContext.Provider value={{
                    localStorageProvider: localStorageProvider,
                    updateTokensApp: updateTokensApp
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
                    />
                </AppContext.Provider>
            </div>


    );
}

export {App}
