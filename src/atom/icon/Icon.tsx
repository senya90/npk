import React, {FunctionComponent} from 'react';
import {IconProps} from "./IconTypes";
import {IconsProvider} from "./iconsProvider";

const Icon:FunctionComponent<IconProps> = (props) => {

    let style: any = {}

    if (props.size) {
        style.fontSize = props.size
    }

    if (props.color) {
        style.fill = props.color
    }

    return (
        <i
            className={props.className}
            onClick={props.onClick}
            style={style}
        >
            {IconsProvider(props.type, props.size, props.color)}
        </i>
    );
};

export {Icon}