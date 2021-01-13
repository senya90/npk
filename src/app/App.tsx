import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css'
import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {Notification} from "../organism/notification/Notification";
import {LocalStorageProvider} from "../core/localStorageProvider/LocalStorageProvider";
import { AppContext } from 'helpers/contexts/AppContext';

const App = () => {
    const localStorageProvider = new LocalStorageProvider()

    return (
        <div>
            <AppContext.Provider value={{
                localStorageProvider: localStorageProvider
            }}>
                <Header/>
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
