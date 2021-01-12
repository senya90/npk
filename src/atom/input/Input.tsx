import React, {FunctionComponent} from 'react';
import cn from 'classnames'
import {Input as InputAnt} from 'antd'
import { InputProps } from './InputTypes';
import styles from './input.module.scss'


const Input: FunctionComponent<InputProps> = (props) => {
    const InputTag = props.password ? InputAnt.Password : InputAnt

    const clearProps = (props: InputProps) => {
        const newProps = {...props}
        delete newProps.password
        return newProps
    }

    const clearedProps = clearProps(props)

    const classname = cn(props.className, {[styles[`input_${props.mode}`]]: props.mode})

    console.log('classname',classname)


    return (
        <InputTag
            {...clearedProps}
            className={classname}
            placeholder={props.placeholder}
        />
    );
};

export {Input}