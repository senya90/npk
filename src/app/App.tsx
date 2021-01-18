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
import styles from './App.module.css'
import {PrivateRoute} from "../core/privateRoute/PrivateRoute";
import {TokensPair} from "../models/tokensPair";


const App = () => {
    const [tokens, setTokens] = useState<TokensPair>()
    const localStorageProvider = useMemo(() => {
        return new LocalStorageProvider()
    }, [])


    useEffect(() => {
        const tokensLS = localStorageProvider.getTokens()
        if (tokensLS) {
            setTokens(tokensLS)
            // setTokens
        }
    }, [localStorageProvider])

    return (

            <div>
                <AppContext.Provider value={{
                    localStorageProvider: localStorageProvider,
                    tokens: tokens
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
                    <Notification
                    />
                </AppContext.Provider>
            </div>


    );
}

export {App}
