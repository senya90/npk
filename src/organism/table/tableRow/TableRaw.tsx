import React, {FunctionComponent} from 'react';

import style from './tableRaw.module.scss'


const TableRaw: FunctionComponent = (props) => {
    return (
        <div className={style.tableRaw}>
            {props.children}
        </div>
    );
};

export {TableRaw}