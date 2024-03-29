import React from 'react';

import style from './footer.module.scss'
import {ThanksIcons} from "./thanks/thanksIcons/ThanksIcons";
import {FooterNavigation} from "./footerNavigation/FooterNavigation";


const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.footerInner}>
                <div>
                    <div className={style.footerMainInfo}>
                        <FooterNavigation className={style.footerNavigation} />
                        <ThanksIcons className={style.thanks}/>
                    </div>
                    <div className={style.copyright}>
                        Copyright © senya90 <a href="https://github.com/senya90">https://github.com/senya90</a> npkcalculator
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Footer}