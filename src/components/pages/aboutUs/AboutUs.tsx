import React from 'react';
import cn from 'classnames'
import { translate } from 'helpers/translate/translate';

import style from './aboutUs.module.scss'
import linkStyle from 'components/atom/link/link.module.scss'
import wrapperStyle from 'components/atom/mainWrapper/mainWrapper.module.scss'
import {Helmet} from "react-helmet";


const AboutUs = () => {
    return (
        <div className={cn(style.aboutUs, wrapperStyle.mainWrapper)}>
            <Helmet>
                <title>{translate('helmetAboutTitle')}</title>
                <meta name="keywords" content={`${translate('helmetMainDescription')}`} />
                <meta name="keywords" content={`${translate('helmetMainKeywords')}`} />
            </Helmet>
            <article>
                <p>{translate('aboutPageP1')}</p>
                <p>
                    {translate('aboutPageP2_1')} <a className={linkStyle.underline} href="mailto:npkcalculatororg@gmail.com">npkcalculatororg@gmail.com</a>. {translate('aboutPageP2_2')}
                </p>
                <p>{translate('aboutPageP3')}</p>
                <p>{translate('aboutPageP4')}</p>
            </article>

        </div>
    );
};

export {AboutUs}