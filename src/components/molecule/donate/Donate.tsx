import React, {FC} from 'react';

import style from './donate.module.scss'


interface DonateProps {}

const Donate: FC<DonateProps> = ({children}) => {

    return (
        <div>
            <div className={style.donate}>
                <span className={style.platform}>PayPal: </span>
                <span className={style.platformValue}>npkcalculatororg@gmail.com</span>
            </div>
        </div>
    );
};

export {Donate}