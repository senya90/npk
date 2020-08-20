import React, {FunctionComponent} from 'react';
import { TableProps } from './TableTypes';

const Table: FunctionComponent<TableProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export {Table}