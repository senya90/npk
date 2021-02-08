import React from "react";
import {ButtonShape, ButtonType} from 'antd/lib/button/button'

export interface ButtonProps {
    type?: ButtonType,
    disabled?: boolean,
    shape?: ButtonShape,
    containerclass?: string,
    onClick?: (e: React.MouseEvent) => void
}


export class BUTTON_TYPE {
    static readonly PRIMARY = 'primary'
    static readonly DEFAULT = 'default'
}

export class BUTTON_SHAPE {
    static readonly CIRCLE = 'circle'
}

