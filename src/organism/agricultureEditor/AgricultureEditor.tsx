import React, {FC} from 'react';
import { AgricultureEditorProps } from './AgricultureEditorTypes';
import {translate} from "../../helpers/translate/translate";
import { Table } from 'organism/table/Table';
import { TableRaw } from 'organism/table/tableRow/TableRaw';
import {Input} from "atom/input/Input";

const AgricultureEditor: FC<AgricultureEditorProps> = (props) => {

    return (
        <div>
            {translate('agriculture editor')}
            <Input
                value={props.agriculture ? props.agriculture.name : ''}
                placeholder={translate('enterAgricultureName')}
            />
            <Table>
                <TableRaw>
                    yo
                </TableRaw>
            </Table>
        </div>
    );
};

export {AgricultureEditor}