import {ButtonShape, ButtonType} from 'antd/lib/button/button'

export interface ButtonProps {
    type?: ButtonType,
    shape?: ButtonShape,
    containerclass?: string
}


export class BUTTON_TYPE {
    static readonly PRIMARY = 'primary'
    static readonly DEFAULT = 'default'
}

export class BUTTON_SHAPE {
    static readonly CIRCLE = 'circle'
}

