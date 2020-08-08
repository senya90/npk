import React from 'react';

import styles from './App.module.css'
import {Calculator} from "../template/calculator/Calculator";

function App() {
    return (
        <div>
            <div className={styles.container}>
                <Calculator />
            </div>
        </div>
    );
}

export default App;
