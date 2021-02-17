import React, {FC} from 'react'
import {Tooltip as TooltipAnt} from 'antd'
import {TooltipProps} from "./TooltipTypes";

const Tooltip: FC<TooltipProps> = ({children, className, title}) => {

    return (
        <TooltipAnt
            title={title}
        >
            <div className={className}>
                {children}
            </div>
        </TooltipAnt>
    );
};

export {Tooltip}