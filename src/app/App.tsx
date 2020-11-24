import React from 'react';

import styles from './App.module.css'
import {Calculator} from "../template/calculator/Calculator";

const App = () => {
    return (
        <div>
            <div className={styles.container}>
                <Calculator/>
            </div>
        </div>
    );
}

export {App}
