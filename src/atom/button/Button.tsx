import React, {FunctionComponent} from 'react';
import { Button as ButtonAnt } from 'antd';

import { ButtonProps } from './ButtonTypes';

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <ButtonAnt
            {...props}
        >
            {props.children}
        </ButtonAnt>
    );
};

export {Button}