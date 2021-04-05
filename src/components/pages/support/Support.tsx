import React from 'react';
import { translate } from 'helpers/translate/translate';

import style from './support.module.scss'
import linkStyle from 'components/atom/link/link.module.scss'
import { Donate } from 'components/molecule/donate/Donate';


const Support = () => {
    return (
        <div className={style.supportWrapper}>
            <div className={style.support}>
                {translate('aboutPageP2_1')} <a className={linkStyle.underline} href="mailto:npkcalculatororg@gmail.com">npkcalculatororg@gmail.com</a>
            </div>
            <div className={style.support}>
                {translate('supportProject')}
                <Donate />
            </div>

        </div>
    );
};

export {Support}