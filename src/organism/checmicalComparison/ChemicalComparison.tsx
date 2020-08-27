import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {chemicalUnitsMockArray} from "../../mocks/chemicalMock";
import {TableCell} from "../table/tableCell/TableCell";
import {ChemicalComparisonView} from 'molecule/chemicalComparisonView/ChemicalComparisonView';
import {ChemicalUnitValue} from "../../models/chemicalUnitValue/chemicalUnitValue";
import { ChemicalUnit } from 'models/chemicalUnit';

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {

    const getMixedValueFromMixture = (): ChemicalUnitValue[] => {
        if (props.mixture && props.mixture.dosages) {
            return props.mixture.toChemicals()
        }
        return []
    }
    let mixed: ChemicalUnitValue[] = getMixedValueFromMixture();

    const getChemicalFromMix = (chemical: ChemicalUnit): number => {
        if (mixed) {
            const found = mixed.find(chemicalUnitValue => chemicalUnitValue.chemicalUnit.id === chemical.id)
            if (found) {
                return found.value
            }
        }
        return 0
    }

    const renderChemicalComposition = () => {
        return chemicalUnitsMockArray().map(chemical => {
            return (
                <ChemicalComparisonView
                    key={chemical.id}
                    chemical={chemical}
                    mixed={getChemicalFromMix(chemical)}
                    vegetation={getVegetationValueFromCrop(chemical)}
                    bloom={getBloomValueFromCrop(chemical)}
                />
            )
        })
    }

    const getVegetationValueFromCrop = (chemical: ChemicalUnit): number => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeCrop.vegetation))
    }

    const getBloomValueFromCrop = (chemical: ChemicalUnit): number => {
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