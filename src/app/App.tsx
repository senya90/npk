import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css'
import {Calculator} from "template/calculator/Calculator";
import { Home } from 'template/home/Home';
import {Login} from "template/login/Login";
import { Header } from 'organism/header/Header';

const App = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <Switch>
                    <Route exact component={Home} path={'/'}/>
                    <Route component={Login} path={'/login'}/>
                    <Route component={Calculator} path={'/calculator'}/>
                </Switch>

            </div>
        </div>
    );
}

export {App}
