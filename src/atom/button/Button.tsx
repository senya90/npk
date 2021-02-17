import React, {FunctionComponent} from 'react';
import cn from 'classnames'
import { Button as ButtonAnt } from 'antd';
import { ButtonProps } from './ButtonTypes';

import style from './button.module.scss'

const Button: FunctionComponent<ButtonProps> = (props) => {

    const styles = cn(
        {[style[`size_${props.size}`]]: props.size},
        props.className
    )

    return (
        <ButtonAnt
            type={props.type}
            className={styles}
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