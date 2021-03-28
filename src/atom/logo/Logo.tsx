import React, {FC} from 'react';
import cn from 'classnames'
import { LogoProps } from './LogoTypes';

import style from './logo.module.scss'


const Logo: FC<LogoProps> = ({
    className,
    children
}) => {

    const wrapperStyle = cn(
        style.logo,
        className
    )

    return (
        <span className={wrapperStyle}>
            <span className={style.firstPartLogo}>npk</span><span className={style.secondPartLogo}>calculator</span>
        </span>
    );
};

export {Logo}