import React, {FC} from 'react';
import style from './tableCell.module.scss'
import cn from 'classnames'

interface TableCellProps {
    className?: string
}

const TableCell: FC<TableCellProps> = (props) => {
    return (
        <div className={cn(style.tableCell, props.className)}>
            {props.children}
        </div>
    );
};

export {TableCell}