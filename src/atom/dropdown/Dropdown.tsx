import React, {FunctionComponent} from 'react';
import cn from 'classnames'

import {Dropdown as DropdownAnt} from 'antd'
import {DropdownProps} from "./DropdownTypes";
import { Menu } from './menu/Menu';

import style from './dropdown.module.scss'

const Dropdown: FunctionComponent<DropdownProps> = ({theme, items, children}) => {
    const styles = cn(
        style.dropdown,
    )

    const menu = <Menu
        theme={theme}
        className={styles}>
        {items}
    </Menu>

    return (
        <DropdownAnt
            overlay={menu}
            placement={'bottomRight'}
            trigger={["click"]}
        >
            {children}
        </DropdownAnt>
    );
};

export {Dropdown}