import React, {FC} from 'react'
import {Tooltip as TooltipAnt} from 'antd'
import {TooltipProps} from "./TooltipTypes";
import cn from 'classnames'

import style from './tooltip.module.scss'

const Tooltip: FC<TooltipProps> = (
    {
        children,
        className,
        title,
        display
    }) => {

    const wrapperStyles = cn(
        style.tooltip,
        {[style[`tooltip_display__${display}`]]: display},
        className
    )

    return (
        <TooltipAnt
            title={title}
        >
            <div className={wrapperStyles}>
                {children}
            </div>
        </TooltipAnt>
    );
};

export {Tooltip}