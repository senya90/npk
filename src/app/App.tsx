import React from 'react';

import './App.css';
import { Button } from '../atom/button/Button';
import { BUTTON_TYPE } from '../CONST/buttonType';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                >
                    Hello world
                </Button>
            </header>
        </div>
    );
}

export default App;
