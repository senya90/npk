import React from 'react'
import {ICON_TYPE} from "./IconTypes";
import {
    RightOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    CloseOutlined
} from '@ant-design/icons';

export function IconsProvider(iconType: ICON_TYPE) {
    switch (iconType) {
        case (ICON_TYPE.RightOutlined):
            return <RightOutlined/>

        case (ICON_TYPE.Edit):
            return <EditOutlined/>

        case (ICON_TYPE.Delete):
            return <DeleteOutlined />

        case (ICON_TYPE.PlusSquare):
            return <PlusSquareOutlined />

        case (ICON_TYPE.MinusSquare):
            return <MinusSquareOutlined />

        case (ICON_TYPE.PlusCircle):
            return <PlusCircleOutlined />

        case (ICON_TYPE.MinusCircle):
            return <MinusCircleOutlined />

        case (ICON_TYPE.Cross):
            return <CloseOutlined />

        default:
            return <div/>
    }
}