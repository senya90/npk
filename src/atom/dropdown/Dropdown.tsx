import React, {FunctionComponent} from 'react';

import {Dropdown as DropdownAnt} from 'antd'
import {DropdownProps} from "./DropdownTypes";
import { Menu } from './menu/Menu';

const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const menu = <Menu>{props.items}</Menu>

    return (
        <DropdownAnt
            overlay={menu}
            placement={'bottomRight'}
        >
            {props.children}
        </DropdownAnt>
    );
};

export {Dropdown}