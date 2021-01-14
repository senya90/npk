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
import {API} from "../core/api";
import {ApiURL} from "../core/api/ApiURL";


const App = () => {
    const [auth, setAuth] = useState<TokensPair | undefined>()
    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])

    useEffect(() => {
        const tokens = localStorageProvider.getTokens()

        if (tokens) {
            const accessIsActive = TokenHelper.isActive(tokens.accessToken)
            // TODO: check refreshToken -> logout

            if (!accessIsActive) {
                API.post(ApiURL.updateToken, null, {'Authorization': `Bearer ${tokens.refreshToken}`})
                    .then((response: any) => {
                        if (response.data && response.data.data) {
                            setAuth(response.data.data)
                        }
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
                        <Route component={Calculator} path={ROUTES.CALCULATOR}/>
                    </Switch>
                </div>
                <Notification
                />
            </AppContext.Provider>
        </div>
    );
}

export {App}
