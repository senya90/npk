import React, {FC} from 'react';
import style from './tableRaw.module.scss'
import cn from 'classnames'

interface TableRawProps {
    className?: string
}

const TableRaw: FC<TableRawProps> = (props) => {
    return (
        <tr className={cn(style.tableRaw, props.className)}>
            {props.children}
        </tr>
    );
};

export {TableRaw}