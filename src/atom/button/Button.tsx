import React, {FunctionComponent} from 'react';
import { Button as ButtonAnt } from 'antd';

import { ButtonProps } from './ButtonTypes';

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <ButtonAnt
            type={props.type}
            className={props.className}
            disabled={props.disabled}
            shape={props.shape}
            danger={props.danger}
            onClick={props.onClick}
        >
            {props.children}
        </ButtonAnt>
    );
};

export {Button}