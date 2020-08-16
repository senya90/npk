import React, {FunctionComponent } from 'react';
import {InputNumber as InputNumberAnt} from 'antd'
import {InputNumberProps, InputTypeValue} from "./InputNumberTypes";

const InputNumber: FunctionComponent<InputNumberProps> = (props) => {
    const onChange = (e: InputTypeValue) => {
        props.onChange(e)
    }

    const isShowPlaceholder = () => {
        return !(Number(props.value) > 0)
    }

    return (
        <InputNumberAnt
            {...props}
            placeholder={isShowPlaceholder() ? '0' : ''}
            value={isShowPlaceholder() ?  undefined: props.value}
            onChange={onChange}
        />
    );
};

export {InputNumber}