import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {chemicalUnitsMock} from "../../mocks/chemicalMock";
import {TableCell} from "../table/tableCell/TableCell";
import {ChemicalComparisonView} from 'molecule/chemicalComparisonView/ChemicalComparisonView';
import {ChemicalUnitValue} from "../../models/chemicalUnitValue";
import { ChemicalUnit } from 'models/chemicalUnit';

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {



    const renderChemicalComposition = () => {
        return chemicalUnitsMock.map(chemical => {
            return (
                <ChemicalComparisonView
                    key={chemical.id}
                    chemical={chemical}
                    vegetation={getVegetationValueFromCrop(chemical)}
                    bloom={getBloomValueFromCrop(chemical)}
                />
            )
        })
    }

    const getVegetationValueFromCrop = (chemical: ChemicalUnit) => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeCrop.vegetation))
    }

    const getBloomValueFromCrop = (chemical: ChemicalUnit) => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeCrop.bloom))
    }

    const _findByChemicalIn = (targetChemical: ChemicalUnit, source?: ChemicalUnitValue[]): ChemicalUnitValue | undefined => {
        if (source) {
            return source.find(veg => veg.chemicalUnit.id === targetChemical.id)
        }
        return undefined
    }

    const _ejectResult = (chemicalUnitValue?: ChemicalUnitValue) => {
        if (chemicalUnitValue) {
            return chemicalUnitValue.value
        }
        return 0
    }

    return (
        <div>
            <Title>{translate('tableSolutions')}</Title>
            <Table>
                <TableRaw>
                    <TableCell>Элемент</TableCell>
                    <TableCell>Замешано</TableCell>
                    <TableCell>Вегетация</TableCell>
                    <TableCell>Цветение</TableCell>
                </TableRaw>
                {renderChemicalComposition()}
            </Table>
        </div>
    );
};

export {ChemicalComparison}