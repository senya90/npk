import React, {FC} from 'react';
import { SwitcherProps } from './SwitcherTypes';
import cn from 'classnames'

import style from './switcher.module.scss'


const Switcher: FC<SwitcherProps> = ({items, active, onChange, className}) => {
    let splitter = '/'

    if (!active) {
        active = items[0] ? items[0].id : undefined
    }

    const change = (id: string) => {
        console.log(id)
    }

    const renderItems = () => {
        return items.map((switchItem, index) => {
            if (index === items.length - 1) {
                splitter = ''
            }

            const itemValueStyle = cn(
                style.itemValue,
                {[style.itemValueActive]: active === switchItem.id}
            )

            return (
                <div className={style.inlineSwitcherItem}>
                    <span className={itemValueStyle} onClick={change.bind(null, switchItem.id)}>
                        {switchItem.element}
                    </span>
                    {splitter}
                </div>
            )
        })
    }


    return (
        <div
            className={cn(className)}
        >
            {renderItems()}
        </div>
    );
};

export {Switcher}