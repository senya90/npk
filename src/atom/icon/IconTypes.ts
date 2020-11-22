import React from "react";

export interface IconProps {
    type: ICON_TYPE
    size?: number
    className?: string
    onClick?: (e: React.MouseEvent) => void
}


export class ICON_TYPE {
    static readonly RightOutlined = 'RightOutlined'
    static readonly LeftOutlined = 'LeftOutlined'
    static readonly DownOutlined = 'DownOutlined'
    static readonly Edit = 'EditOutlined'
    static readonly Delete = 'DeleteOutlined'

    static readonly PlusSquare = 'PlusSquareOutlined'
    static readonly MinusSquare = 'MinusSquareOutlined'
    static readonly PlusCircle = 'PlusCircleOutlined'
    static readonly MinusCircle = 'MinusCircleOutlined'

    static readonly Cross = 'CloseOutlined'
}