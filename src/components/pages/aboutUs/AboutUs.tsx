import React from 'react';
import { translate } from 'helpers/translate/translate';

import style from './aboutUs.module.scss'


const AboutUs = () => {
    return (
        <div className={style.aboutUs}>
            <article>
                <p>{translate('aboutPageP1')}</p>
                <p>{translate('aboutPageP2')}</p>
                <p>{translate('aboutPageP3')}</p>
                <p>{translate('aboutPageP4')}</p>
            </article>

        </div>
    );
};

export {AboutUs}