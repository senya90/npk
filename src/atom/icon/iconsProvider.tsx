import React from 'react'
import {ICON_TYPE} from "./IconTypes";
import {
    RightOutlined
} from '@ant-design/icons';

export function IconsProvider(iconType: ICON_TYPE) {
    switch (iconType) {
        case (ICON_TYPE.RightOutlined):
            return <RightOutlined/>


        default:
            return <div/>
    }
}