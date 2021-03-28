import React, {FunctionComponent } from 'react';
import cn from 'classnames'
import {InputNumber as InputNumberAnt} from 'antd'
import {InputNumberProps, InputTypeValue} from "./InputNumberTypes";
import './inputNumber.module.scss'
import style from './inputNumber.module.scss'

const InputNumber: FunctionComponent<InputNumberProps> = (props) => {
    const onChange = (e: InputTypeValue) => {
        props.onChange(e)
    }

    const isShowPlaceholder = () => {
        return !(Number(props.value) > 0)
    }

    const styles = cn(
        style.antInputNumberInput,
        props.className
    )

    return (
        <InputNumberAnt
            {...props}
            className={styles}
            placeholder={isShowPlaceholder() ? '0' : ''}
            value={isShowPlaceholder() ?  undefined: props.value}
            onChange={onChange}
        />
    );
};

export {InputNumber}