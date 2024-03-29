import React, {FC} from 'react';

import style from './donate.module.scss'


interface DonateProps {}

const Donate: FC<DonateProps> = ({children}) => {

    return (
        <span className={style.donateWrapper}>
            <span className={style.donate}>
                <span className={style.platform}>PayPal: </span>
                <span className={style.platformValue}>npkcalculatororg@gmail.com</span>
            </span>
        </span>
    );
};

export {Donate}