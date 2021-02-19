import React, {FunctionComponent} from 'react';
import { MenuProps } from './MenuTypes';
import {Menu as MenuAnt} from 'antd'

const Menu: FunctionComponent<MenuProps> = (props) => {
    const renderItems = () => {
        return React.Children.map(props.children, (child, index) => {
            return (
                <MenuAnt.Item key={index}>
                    <div key={index}>{child}</div>
                </MenuAnt.Item>
            )
        })
    }

    return (
        <MenuAnt mode="inline">
            {renderItems()}
        </MenuAnt>
    );
};

export {Menu}