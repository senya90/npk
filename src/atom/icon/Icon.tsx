import React, {FunctionComponent} from 'react';
import {IconProps} from "./IconTypes";
import {IconsProvider} from "./iconsProvider";

const Icon:FunctionComponent<IconProps> = (props) => {

    let style: any = {}

    if (props.size) {
        style.fontSize = props.size
    }

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