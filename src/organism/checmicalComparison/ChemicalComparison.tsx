import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
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
        return props.chemicals.map(chemical => {
            return (
                <ChemicalComparisonView
                    key={chemical.id}
                    chemical={chemical}
                    mixed={getChemicalFromMix(chemical)}
                    vegetation={getVegetationValueFromAgriculture(chemical)}
                    bloom={getBloomValueFromAgriculture(chemical)}
                />
            )
        })
    }

    const getVegetationValueFromAgriculture = (chemical: ChemicalUnit): number => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeAgriculture.vegetation))
    }

    const getBloomValueFromAgriculture = (chemical: ChemicalUnit): number => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeAgriculture.bloom))
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
            <Title border>{translate('tableSolutions')}</Title>
            <Table full>
                <thead>
                    <TableRaw>
                        <TableCell header>{translate('element')}</TableCell>
                        <TableCell header>{translate('mixed')}</TableCell>
                        <TableCell header>{translate('vegetation')}</TableCell>
                        <TableCell header>{translate('bloom')}</TableCell>
                    </TableRaw>
                </thead>
                <tbody>
                    {renderChemicalComposition()}
                </tbody>
            </Table>
        </div>
    );
};

export {ChemicalComparison}