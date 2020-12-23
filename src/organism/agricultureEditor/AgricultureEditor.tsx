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
import {isExist} from "../../helpers/utils";


const AgricultureEditor: FC<AgricultureEditorProps> = ({agriculture, onAgricultureChanged, chemicals}) => {
    const [name, setName] = useState<string>("")

    useEffect(() => {
        if (agriculture) {
            setName(agriculture.name)
        }
    }, [agriculture])

    const renderRows = (collection: ChemicalUnitValue[]) => {

        const chemicalsValues = chemicals.map(chemical => new ChemicalUnitValue(chemical, 0))

        return chemicalsValues.map(chemicalUnitValue => {
            let renderChemical = chemicalUnitValue

            if (collection) {
                const fromAgriculture = collection.find(agricultureChemical => agricultureChemical.chemicalUnit.id === renderChemical.chemicalUnit.id)
                if (fromAgriculture) {
                    renderChemical = fromAgriculture
                }
            }

            return (
                <TableRaw key={renderChemical.chemicalUnit.id} className={style.elementLine}>
                    <TableCell noPadding className={style.elementName}>{renderChemical.chemicalUnit.name}</TableCell>
                    <TableCell noPadding>
                        <Input value={String(renderChemical.value)} />
                    </TableCell>
                </TableRaw>
            )
        })
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

    const isEditMode = (): boolean => {
        return isExist!(agriculture)
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
                {isEditMode() ? translate('save') : translate('add')}
            </Button>

        </div>
    );
};

export {AgricultureEditor}