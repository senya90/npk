import React, {FunctionComponent} from 'react';
import {IconProps} from "./IconTypes";
import {IconsProvider} from "./iconsProvider";

const Icon:FunctionComponent<IconProps> = (props) => {

    const style = props.size ? {fontSize: props.size} : {}

    return (
        <i
            className={props.className}
            onClick={props.onClick}
            style={style}
        >
            {IconsProvider(props.type)}
        </i>
    );
};

export {Icon}