import React, {FC} from 'react';
import {GagProps} from "./GagTypes";

import style from './gag.module.scss'


const Gag: FC<GagProps> = ({icon, children}) => {
    return (
        <div className={style.gag}>
            <div className={style.text}>{children}</div>
        </div>
    );
};

export {Gag}