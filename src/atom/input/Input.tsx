import React, {FunctionComponent} from 'react';
import {Input as InputAnt} from 'antd'
import { InputProps } from './InputTypes';

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <InputAnt
            placeholder={props.placeholder}
        />
    );
};

export {Input}