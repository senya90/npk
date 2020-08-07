import React from 'react';

import { Button } from 'atom/button/Button';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import { FertilizerEditor } from 'organism/fertilizerEditor/FertilizerEditor';

import styles from './App.module.css'

function App() {
    return (
        <div>
            <div className={styles.container}>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                >
                    Добавить удобрение
                </Button>
                <FertilizerEditor/>
            </div>
        </div>
    );
}

export default App;
