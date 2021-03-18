import React, {FunctionComponent} from 'react';
import cn from 'classnames'
import { Button as ButtonAnt } from 'antd';
import { ButtonProps } from './ButtonTypes';

import style from './button.module.scss'

const Button: FunctionComponent<ButtonProps> = ({
    className,
    children,
    htmlType,
    size,
    danger,
    shape,
    disabled,
    type,
    onClick = (e) => {}
}) => {

    const styles = cn(
        {[style[`size_${size}`]]: size},
        className
    )

    return (
        <ButtonAnt
            type={type}
            htmlType={htmlType}
            className={styles}
            disabled={disabled}
            shape={shape}
            danger={danger}
            onClick={onClick}
        >
            {children}
        </ButtonAnt>
    );
};

export {Button}