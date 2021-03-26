import React, {FC, useEffect, useState} from 'react';
import { SwitcherProps } from './SwitcherTypes';
import cn from 'classnames'

import style from './switcher.module.scss'


const Switcher: FC<SwitcherProps> = ({items, active, onChange, className}) => {
    let splitter = '/'
    const [activeItem, setActiveItem] = useState<string | undefined>('')

    useEffect(() => {
        if (!active) {
            let activeValue = items[0] ? items[0].id : undefined
            setActiveItem(activeValue)
            return
        }

        setActiveItem(active)
    }, [active, items])



    const change = (id: string) => {
        setActiveItem(id)

        if (onChange) {
            onChange(id)
        }
    }

    const renderItems = () => {
        return items.map((switchItem, index) => {
            if (index === items.length - 1) {
                splitter = ''
            }

            const itemValueStyle = cn(
                style.itemValue,
                {[style.itemValueActive]: activeItem === switchItem.id}
            )

            return (
                <div className={style.inlineSwitcherItem} key={switchItem.id}>
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