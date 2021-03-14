import React from 'react'
import {ICON_TYPE} from "./IconTypes";
import {
    RightOutlined,
    EditOutlined,
    DownOutlined,

    DeleteOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    CloseOutlined,
    CaretRightOutlined,
    DoubleRightOutlined,
    TableOutlined
} from '@ant-design/icons';
import { CustomIcon } from 'atom/customIcon/CustomIcon';

export function IconsProvider(iconType: ICON_TYPE, size = 30, color = '#000000') {
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

        case (ICON_TYPE.DownOutlined):
            return <DownOutlined />

        case (ICON_TYPE.CaretRightOutlined):
            return <CaretRightOutlined />

        case (ICON_TYPE.DoubleRightOutlined):
            return <DoubleRightOutlined />

        case (ICON_TYPE.Table):
            return <TableOutlined />

        case (ICON_TYPE.Fertilizer):
            return <CustomIcon iconType={ICON_TYPE.Fertilizer} size={size} color={color}/>

        case (ICON_TYPE.Flasks):
            return <CustomIcon iconType={ICON_TYPE.Flasks} size={size} color={color}/>

        case (ICON_TYPE.Agriculture):
            return <CustomIcon iconType={ICON_TYPE.Agriculture} size={size} color={color}/>

        default:
            return <div/>
    }
}