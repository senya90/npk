import React, {FunctionComponent} from 'react';
import cn from 'classnames'
import { MenuProps } from './MenuTypes';
import {Menu as MenuAnt} from 'antd'

import style from './menu.module.scss'

const Menu: FunctionComponent<MenuProps> = (props) => {
    const renderItems = () => {
        return React.Children.map(props.children, (child, index) => {
            const styles = cn(
                style.menuItem,
                {[style[`menuItem__${props.theme}`]]: props.theme},
            )
            return (
                <MenuAnt.Item key={index} className={styles}>
                    <div key={index}>{child}</div>
                </MenuAnt.Item>
            )
        })
    }

    const styles = cn(
        style.menu,
        {[style[`menu__${props.theme}`]]: props.theme},
        props.className
    )

    return (
        <MenuAnt
            mode="inline"
            className={styles}
        >
            {renderItems()}
        </MenuAnt>
    );
};

export {Menu}