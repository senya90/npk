import React, {FC} from 'react';
import {AgricultureEditorProps} from './AgricultureEditorTypes';
import {translate} from "../../helpers/translate/translate";
import {Table} from 'organism/table/Table';
import {TableRaw} from 'organism/table/tableRow/TableRaw';
import {Input} from "atom/input/Input";
import {ChemicalUnitValue} from "../../models/chemicalUnitValue/chemicalUnitValue";
import {TableCell} from "../table/tableCell/TableCell";

import style from './agricultureEditor.module.scss'
import cn from 'classnames'


const AgricultureEditor: FC<AgricultureEditorProps> = (props) => {

    const renderRows = (collection: ChemicalUnitValue[]) => {
        if (collection) {
            return collection.map(chemicalUnitValue => {
                return (
                    <TableRaw key={chemicalUnitValue.chemicalUnit.id} className={style.elementLine}>
                        <TableCell className={style.elementName}>{chemicalUnitValue.chemicalUnit.name}</TableCell>
                        <TableCell>
                            <Input value={String(chemicalUnitValue.value)} />
                        </TableCell>
                    </TableRaw>
                )
            })
        }

        return null
    }

    return (
        <div>
            <Input
                value={props.agriculture ? props.agriculture.name : ''}
                placeholder={translate('enterAgricultureName')}
                className={style.name}
            />
            <div className={style.editor}>
                {props.agriculture && props.agriculture.vegetation &&
                <div className={style.editorField}>
                    <div className={cn(style.tableTitle, style.vegetation)}>{translate('vegetation')}</div>
                    <Table>
                        {renderRows(props.agriculture.vegetation)}
                    </Table>
                </div>
                }
                {props.agriculture && props.agriculture.bloom &&
                <div  className={style.editorField}>
                    <div className={cn(style.tableTitle, style.bloom)}>{translate('bloom')}</div>
                    <Table>
                        {renderRows(props.agriculture.bloom)}
                    </Table>
                </div>
                }
            </div>

        </div>
    );
};

export {AgricultureEditor}