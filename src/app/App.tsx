import React from 'react';

import './App.css';
import { Button } from '../atom/button/Button';
import {FertilizerEditor} from "../organism/fertilizerEditor/FertilizerEditor";
import {BUTTON_TYPE} from '../atom/button/ButtonTypes';

function App() {
    return (
        <div>
            <header>

            </header>
            <div>
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
