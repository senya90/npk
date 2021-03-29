import React from 'react';
import {translate} from "../../../helpers/translate/translate";

import style from './home.module.scss'


const Home = () => {
    return (
        <div className={style.homeWrapper}>
            <article>
                <p>npkcalculator {translate('homePageP1')}</p>
                <p>{translate('homePageP2')}</p>
                <p>{translate('homePageP3')}</p>
            </article>
        </div>
    );
};

export {Home}