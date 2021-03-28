import React, {FC} from 'react';
import style from './tableCell.module.scss'
import cn from 'classnames'

interface TableCellProps {
    className?: string
    noPadding?: boolean
    header?: boolean
}

const TableCell: FC<TableCellProps> = (props) => {
    const CellTag = props.header ? 'th' : 'td'

    return (
        <CellTag className={cn(style.tableCell, props.className, {[style.noPadding]: props.noPadding })}>
            {props.children}
        </CellTag>
    );
};

export {TableCell}