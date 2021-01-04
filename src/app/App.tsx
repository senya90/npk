import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css'
import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import {Login} from "template/login/Login";
import { Header } from 'organism/header/Header';
import {ROUTES} from "core/routes/routes";

const App = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <Switch>
                    <Route exact component={Home} path={ROUTES.MAIN_PAGE}/>
                    <Route component={Login} path={ROUTES.LOGIN}/>
                    <Route component={Calculator} path={ROUTES.CALCULATOR}/>
                </Switch>

            </div>
        </div>
    );
}

export {App}
