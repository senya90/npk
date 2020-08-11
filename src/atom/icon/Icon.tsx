import React, {FunctionComponent} from 'react';
import {IconProps} from "./IconTypes";
import {IconsProvider} from "./iconsProvider";

const Icon:FunctionComponent<IconProps> = (props) => {
    return (
        <i
            className={props.className}
        >
            {IconsProvider(props.type)}
        </i>
    );
};

export {Icon}