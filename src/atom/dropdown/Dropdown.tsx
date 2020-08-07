import React, {FunctionComponent} from 'react';

import {Dropdown as DropdownAnt} from 'antd'
import {DropdownProps} from "./DropdownTypes";
import { Menu } from './menu/Menu';

const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const menu = <Menu items={props.items} />

    return (
        <DropdownAnt.Button
            overlay={menu}
        >
            {props.placeholder}
        </DropdownAnt.Button>
    );
};

export {Dropdown}