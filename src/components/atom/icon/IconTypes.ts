import React from "react";

export interface IconProps {
    type: ICON_TYPE
    size?: number
    color?: string
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
    static readonly CaretRightOutlined = 'CaretRightOutlined'
    static readonly DoubleRightOutlined = 'DoubleRightOutlined'

    static readonly Cross = 'CloseOutlined'
    static readonly Table = 'TableOutlined'
    static readonly Menu = 'MenuOutlined'


    // CUSTOM ICONS
    static readonly Fertilizer = 'Fertilizer'
    static readonly Flasks = 'Flasks'
    static readonly Agriculture = 'Agriculture'
}