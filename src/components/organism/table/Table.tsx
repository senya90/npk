import React, {FunctionComponent} from 'react';
import { TableProps } from './TableTypes';
import cn from 'classnames'
import style from './table.module.scss'

const Table: FunctionComponent<TableProps> = (props) => {

    return (
        <table className={cn(props.className, {[style.fullWidth]: props.full})}>
            {props.children}
        </table>
    );
};

export {Table}