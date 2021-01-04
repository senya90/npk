import React, {FunctionComponent} from 'react';
import {Input as InputAnt} from 'antd'
import { InputProps } from './InputTypes';

const Input: FunctionComponent<InputProps> = (props) => {
    const InputTag = props.password ? InputAnt.Password : InputAnt

    const clearProps = (props: InputProps) => {
        const newProps = {...props}
        delete newProps.password
        return newProps
    }

    const clearedProps = clearProps(props)

    return (
        <InputTag
            {...clearedProps}
            placeholder={props.placeholder}
        />
    );
};

export {Input}