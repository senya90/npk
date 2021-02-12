import React, {FC} from 'react'
import {TooltipProps} from "./TooltipTypes";


const Tooltip: FC<TooltipProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export {Tooltip}