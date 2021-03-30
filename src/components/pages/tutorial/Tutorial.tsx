import React from 'react';
import { translate } from 'helpers/translate/translate';

import style from './tutorial.module.scss'
import { Note } from 'components/atom/note/Note';


const Tutorial = () => {
    return (
        <div className={style.tutorialWrapper}>
            <h1>{translate('howToUse')} npkcalculator?</h1>
            <article>
                <h2>• {translate('registerForUse')}</h2>
                <h2>• {translate('fertilizerAddition')}</h2>
                <ol>
                    <li><span>{translate('fertilizerAdditionStep1')}</span></li>
                    <li>
                        <span>{translate('fertilizerAdditionStep2')}</span>
                        <span><Note>{translate('fertilizerAdditionStep2Note')}</Note></span>
                    </li>
                    <li><span>{translate('fertilizerAdditionStep3')}</span></li>
                </ol>
                <h2>• {translate('plantAddition')}</h2>
                <p>{translate('plantAdditionDescription')}</p>
                <ol>
                    <li><span>{translate('plantAdditionStep1')}</span></li>
                    <li><span>{translate('plantAdditionStep2')}</span></li>
                    <span><Note>{translate('plantAdditionStep2Note')}</Note></span>
                </ol>
            </article>
        </div>
    );
};

export {Tutorial}