import React, {FC} from 'react';
import style from './tableCell.module.scss'
import cn from 'classnames'

interface TableCellProps {
    className?: string
    noPadding?: boolean
}

const TableCell: FC<TableCellProps> = (props) => {
    return (
        <div className={cn(style.tableCell, props.className, {[style.noPadding]: props.noPadding })}>
            {props.children}
        </div>
    );
};

export {TableCell}