import React from 'react';

import styles from './App.module.css'
import {Calculator} from "../template/calculator/Calculator";
import Modal from "../organism/modal/Modal";

const App = () => {
    return (
        <div>
            <div className={styles.container}>
                <Modal
                    title={"Добавить удобрение"}
                    onClose={() => {}}
                >
                    <div>модалка!</div>
                </Modal>
                <Calculator/>
            </div>
        </div>
    );
}

export {App}
