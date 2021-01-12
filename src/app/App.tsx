import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css'
import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";
import { SignIn } from 'pages/signIn/SignIn';
import {Notification} from "../organism/notification/Notification";

const App = () => {
    return (
        <div>
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
        </div>
    );
}

export {App}
