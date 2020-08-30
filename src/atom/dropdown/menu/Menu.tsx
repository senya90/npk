import React, {FunctionComponent} from 'react';
import { MenuProps } from './MenuTypes';
import {Menu as MenuAnt} from 'antd'

const Menu: FunctionComponent<MenuProps> = (props) => {

    const handleMenuClick = () => {
    }

    return (
        <MenuAnt onClick={handleMenuClick}>
            <MenuAnt.Item key="1">
                1st menu item
            </MenuAnt.Item>
            <MenuAnt.Item key="2">
                2nd menu item
            </MenuAnt.Item>
            <MenuAnt.Item key="3">
                3rd menu item
            </MenuAnt.Item>
        </MenuAnt>
    );
};

export {Menu}