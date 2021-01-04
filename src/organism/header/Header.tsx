import React from 'react';
import { Link } from 'react-router-dom';
import {translate} from "../../helpers/translate/translate";

const Header = () => {
    return (
        <div>
            <nav>
                <Link to={'/'}>{translate('mainPage')}</Link>
                <Link to={'/calculator'}>{translate('calculatorPage')}</Link>
            </nav>
        </div>
    );
};

export {Header}