import React, {FunctionComponent } from 'react';
import {InputNumber as InputNumberAnt} from 'antd'
import {InputNumberProps, InputTypeValue} from "./InputNumberTypes";

const InputNumber: FunctionComponent<InputNumberProps> = (props) => {
    const onChange = (e: InputTypeValue) => {
        props.onChange(e)
    }

    return (
        <InputNumberAnt
            {...props}
            onChange={onChange}
        />
    );
};

export {InputNumber}