import React from 'react';

import styles from './App.module.css'
import {Calculator} from "../template/calculator/Calculator";
import Modal from "../organism/modal/Modal";

function App() {
    return (
        <div>
            <div className={styles.container}>
                <Modal>
                    <div>модалка!</div>
                </Modal>
                <Calculator />
            </div>
        </div>
    );
}

export default App;
