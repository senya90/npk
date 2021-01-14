import React, {useEffect, useMemo, useState} from 'react';
import { Switch, Route } from 'react-router-dom';

import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {Notification} from "../organism/notification/Notification";
import {LocalStorageProvider} from "../core/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';
import {TokensPair} from "../models/tokensPair";
import styles from './App.module.css'
import {TokenHelper} from "../helpers/tokens";
import {PrivateRoute} from "../core/privateRoute/PrivateRoute";


const App = () => {
    const [auth, setAuth] = useState<TokensPair | undefined>()
    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])

    useEffect(() => {
        const tokens = localStorageProvider.getTokens()

        if (tokens) {
            // const refreshIsActive = TokenHelper.isActive(tokens.refreshToken)
            const accessIsActive = TokenHelper.isActive(tokens.accessToken)

            if (!accessIsActive) {
                TokenHelper.updateTokens(tokens.refreshToken)
                    .then(tokens => {
                        if (tokens) {
                            return setAuth(tokens)
                        }

                        setAuth(undefined)
                    })
                    .catch(() => {
                        setAuth(undefined)
                    })


            }
        }

    }, [localStorageProvider])

    return (
        <div>
            <AppContext.Provider value={{
                localStorageProvider: localStorageProvider
            }}>
                <Header/>
                {auth && <div>hi</div>}
                <div className={styles.container}>
                    <Switch>
                        <Route exact component={Home} path={ROUTES.MAIN_PAGE}/>
                        <Route component={SignIn} path={ROUTES.LOGIN}/>
                        <Route component={SignIn} path={ROUTES.REGISTRATION}/>
                        <PrivateRoute component={Calculator} path={ROUTES.CALCULATOR}/>
                    </Switch>
                </div>
                <Notification
                />
            </AppContext.Provider>
        </div>
    );
}

export {App}
