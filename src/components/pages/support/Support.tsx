import React from 'react';
import cn from 'classnames'
import { translate } from 'helpers/translate/translate';

import style from './support.module.scss'
import linkStyle from 'components/atom/link/link.module.scss'
import wrapperStyle from 'components/atom/mainWrapper/mainWrapper.module.scss'
import { Donate } from 'components/molecule/donate/Donate';
import {Helmet} from "react-helmet";


const Support = () => {
    return (
        <div className={cn(style.supportWrapper, wrapperStyle.mainWrapper)}>
            <Helmet>
                <title>{translate('helmetSupportTitle')}</title>
                <meta name="keywords" content={`${translate('helmetMainDescription')}`} />
                <meta name="keywords" content={`${translate('helmetMainKeywords')}`} />
            </Helmet>
            <article>
                <h1>{translate('supportPage')}</h1>

                <p className={style.support}>
                    {translate('aboutPageP2_1')} <a className={linkStyle.underline} href="mailto:npkcalculatororg@gmail.com">npkcalculatororg@gmail.com</a>
                </p>
                <p className={style.support}>
                    {translate('supportProject')}
                    <Donate />
                </p>
            </article>

        </div>
    );
};

export {Support}