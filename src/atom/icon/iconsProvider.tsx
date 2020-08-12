import React from 'react'
import {ICON_TYPE} from "./IconTypes";
import {
    RightOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export function IconsProvider(iconType: ICON_TYPE) {
    switch (iconType) {
        case (ICON_TYPE.RightOutlined):
            return <RightOutlined/>

        case (ICON_TYPE.Edit):
            return <EditOutlined/>

        case (ICON_TYPE.Delete):
            return <DeleteOutlined />

        default:
            return <div/>
    }
}