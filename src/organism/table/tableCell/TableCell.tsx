import React, {FunctionComponent} from 'react';

import style from './tableCell.module.scss'


const TableCell: FunctionComponent = (props) => {
    return (
        <div className={style.tableCell}>
            {props.children}
        </div>
    );
};

export {TableCell}