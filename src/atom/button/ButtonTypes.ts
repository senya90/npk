import React from "react";
import {ButtonShape, ButtonType} from 'antd/lib/button/button'

export interface ButtonProps {
    type?: ButtonType,
    disabled?: boolean,
    shape?: ButtonShape,
    danger?: boolean,
    size?: TButtonSize
    className?: string,
    onClick?: (e: React.MouseEvent) => void
    htmlType?: 'submit' | 'button' | 'reset'
}


export class BUTTON_TYPE {
    static readonly PRIMARY = 'primary'
    static readonly DEFAULT = 'default'
}

export class BUTTON_SHAPE {
    static readonly CIRCLE = 'circle'
}

export class BUTTON_SIZE {
    static readonly SMALL: TButtonSize = "small"
    static readonly DEFAULT: TButtonSize = "default"
}

export type TButtonSize = 'default' | 'small'
