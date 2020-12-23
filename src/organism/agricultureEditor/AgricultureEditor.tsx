import React, {FC, useEffect, useState} from 'react';
import {AgricultureEditorProps} from './AgricultureEditorTypes';
import {translate} from "../../helpers/translate/translate";
import {Table} from 'organism/table/Table';
import {TableRaw} from 'organism/table/tableRow/TableRaw';
import {Input} from "atom/input/Input";
import {ChemicalUnitValue} from "../../models/chemicalUnitValue/chemicalUnitValue";
import {TableCell} from "../table/tableCell/TableCell";

import style from './agricultureEditor.module.scss'
import cn from 'classnames'
import {Button} from "../../atom/button/Button";
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";


const AgricultureEditor: FC<AgricultureEditorProps> = ({agriculture, onAgricultureChanged}) => {
    const [name, setName] = useState<string>("")

    useEffect(() => {
        if (agriculture) {
            setName(agriculture.name)
        }
    }, [agriculture])

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

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const save = () => {
        if (agriculture) {
            const updatedAgriculture = agriculture.clone()
            updatedAgriculture.name = name
            onAgricultureChanged(updatedAgriculture)
        }
    }

    return (
        <div>
            <Input
                className={style.name}
                onChange={changeName}
                value={name ? name : ''}
                placeholder={translate('enterAgricultureName')}
            />
            <div className={style.editor}>
                {agriculture && agriculture.vegetation &&
                <div className={style.editorField}>
                    <div className={cn(style.tableTitle, style.vegetation)}>{translate('vegetation')}</div>
                    <Table>
                        {renderRows(agriculture.vegetation)}
                    </Table>
                </div>
                }
                {agriculture && agriculture.bloom &&
                <div  className={style.editorField}>
                    <div className={cn(style.tableTitle, style.bloom)}>{translate('bloom')}</div>
                    <Table>
                        {renderRows(agriculture.bloom)}
                    </Table>
                </div>
                }
            </div>
            <Button
                type={BUTTON_TYPE.PRIMARY}
                onClick={save}
            >
                {translate('save')}
            </Button>

        </div>
    );
};

export {AgricultureEditor}