import React, {FC, useCallback, useEffect, useState} from 'react';
import {AgricultureCollectionType, AgricultureEditorProps} from './AgricultureEditorTypes';
import {translate} from "../../../helpers/translate/translate";
import {Table} from 'components/organism/table/Table';
import {TableRaw} from 'components/organism/table/tableRow/TableRaw';
import {Input} from "components/atom/input/Input";
import {ChemicalUnitValue} from "../../../models/chemicalUnitValue/chemicalUnitValue";
import {TableCell} from "../table/tableCell/TableCell";

import style from './agricultureEditor.module.scss'
import cn from 'classnames'
import {Button} from "../../atom/button/Button";
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {isExist} from "../../../helpers/utils";
import {InputNumber} from "../../atom/inputNumber/InputNumber";
import {InputTypeValue} from "../../atom/inputNumber/InputNumberTypes";
import {Agriculture} from "../../../models/agriculture";


const AgricultureEditor: FC<AgricultureEditorProps> =
    ({
         agriculture,
         onAgricultureChanged,
         onAgricultureAdd,
         chemicals
    }) => {
    const [name, setName] = useState<string>("")
    const getDefaultChemicals = () => {
        return chemicals.map(c => new ChemicalUnitValue(c, 0))
    }
    const [editableVegetation, setEditableVegetation] = useState<ChemicalUnitValue[]>(getDefaultChemicals())
    const [editableBloom, setEditableBloom] = useState<ChemicalUnitValue[]>(getDefaultChemicals())


    const mergeWithAgricultureChemicals = useCallback(
        (agricultureChemicals: ChemicalUnitValue[]): ChemicalUnitValue[] => {
            const chemicalsValues = chemicals.map(chemical => new ChemicalUnitValue(chemical, 0))

            return chemicalsValues.map(chemicalUnitValue => {
                let editableChemical = chemicalUnitValue

                if (agricultureChemicals) {
                    const fromAgriculture = agricultureChemicals.find(agricultureChemical => agricultureChemical.chemicalUnit.id === editableChemical.chemicalUnit.id)
                    if (fromAgriculture) {
                        editableChemical = fromAgriculture
                    }
                }
                return editableChemical
            })

        }, [chemicals]
    )

    useEffect(() => {
        if (agriculture) {
            setName(agriculture.name)
            setEditableVegetation(mergeWithAgricultureChemicals(agriculture.vegetation))
            setEditableBloom(mergeWithAgricultureChemicals(agriculture.bloom))
        }
    }, [agriculture, mergeWithAgricultureChemicals])

    const changeAgricultureCollection = (value: InputTypeValue, chemical: ChemicalUnitValue, collectionType: AgricultureCollectionType) => {
        const targetCollection = collectionType === "vegetation" ? editableVegetation : editableBloom
        if (targetCollection) {
            const edited = targetCollection.map(chemicalUnitValue => {
                if (chemicalUnitValue.chemicalUnit.id === chemical.chemicalUnit.id) {
                    return new ChemicalUnitValue(chemical.chemicalUnit, Number(value))
                }
                return chemicalUnitValue
            })
            changeCollection(edited, collectionType)
        }
    }

    const changeCollection = (collection: ChemicalUnitValue[], collectionType: AgricultureCollectionType) => {
        if (collectionType === "vegetation") {
            setEditableVegetation(collection)
        }

        if (collectionType === "bloom") {
            setEditableBloom(collection)
        }
    }

    const renderRows = (collection: ChemicalUnitValue[], collectionType: AgricultureCollectionType) => {
        return collection.map(function(renderChemical) {
            return (
                <TableRaw key={renderChemical.chemicalUnit.id} className={style.elementLine}>
                    <TableCell noPadding className={style.elementName}>{renderChemical.chemicalUnit.name}</TableCell>
                    <TableCell noPadding>
                        <InputNumber
                            value={renderChemical.value}
                            className={style.valueInput}
                            onChange={(e) => {
                                changeAgricultureCollection(e, renderChemical, collectionType)
                            }}
                        />
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
            let updatedAgriculture = Agriculture.createNew(agriculture)
            updatedAgriculture.name = name
            updatedAgriculture.vegetation = editableVegetation
            updatedAgriculture.bloom = editableBloom
            updatedAgriculture = _filterAgricultureCollections(updatedAgriculture)
            onAgricultureChanged(updatedAgriculture)
            return
        }
    }

    const add = () => {
        let newAgriculture = new Agriculture(name, editableVegetation, editableBloom)
        newAgriculture = _filterAgricultureCollections(newAgriculture)
        onAgricultureAdd(newAgriculture)
    }

    const _filterAgricultureCollections = (agriculture: Agriculture) => {
        const updated = agriculture.clone()
        updated.vegetation = updated.vegetation.filter(chemical => chemical.value !== 0)
        updated.bloom = updated.bloom.filter(chemical => chemical.value !== 0)
        return updated
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
                placeholder={translate('enterPlantName')}
            />
            <div className={style.editor}>
                <div className={style.editorField}>
                    <div className={cn(style.tableTitle, style.vegetation)}>{translate('vegetation')}</div>
                    <Table full>
                        <tbody>
                            {renderRows(editableVegetation, "vegetation")}
                        </tbody>
                    </Table>
                </div>
                <div  className={style.editorField}>
                    <div className={cn(style.tableTitle, style.bloom)}>{translate('bloom')}</div>
                    <Table full>
                        <tbody>
                            {renderRows(editableBloom, "bloom")}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className={style.editorFooter}>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    onClick={isEditMode() ? save : add}
                >
                    {isEditMode() ? translate('save') : translate('add')}
                </Button>
            </div>

        </div>
    );
};

export {AgricultureEditor}