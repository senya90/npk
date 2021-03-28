import React, {FC} from 'react';
import {Popover as PopoverAnt} from 'antd'


interface PopoverProps {
    title?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    content?: JSX.Element
    children: JSX.Element
}


const Popover: FC<PopoverProps> = (
    {
        title,
        content,
        visible,
        onVisibleChange,
        children
    }) => {

    return (
        <PopoverAnt
            title={title}
            content={content}
            trigger={"click"}
            visible={visible}
            onVisibleChange={onVisibleChange}

        >
            {children}
        </PopoverAnt>
    );
};

export {Popover}