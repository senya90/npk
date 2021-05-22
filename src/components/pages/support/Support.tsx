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
                <meta name="keywords" content={`Add fertilizers, make solutions, grow plants. Добавляйте удобрения, создавайте растворы, выращивайте растения`} />
                <meta name="keywords" content={`growing, growing plants, npk, npk calculator, fertilizers, fertilizer, solution, micro elements, macronutrients, nutritions, how to fertilize plants, nitrogen, potassium, phosphorus, calcium, magnesium, how to use npk calculator, выращивание, выращивание растений, нпк, нпк кальулятор, удобрения, удобрение, раствор, микроэлементы, макроэлементы, подкормка, как удобрять растения, азот, калий, фосфор, кальций, магний, как пользоваться нпк калькулятором`} />
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