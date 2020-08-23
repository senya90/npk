import React, {FunctionComponent, useContext} from 'react';
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
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {
    const {getChemicalComplexById} = useContext(CalculatorContext)

    const renderChemicalComposition = () => {
        return chemicalUnitsMock.map(chemical => {
            return (
                <ChemicalComparisonView
                    key={chemical.id}
                    chemical={chemical}
                    mixed={getMixedValueFromMixture()}
                    vegetation={getVegetationValueFromCrop(chemical)}
                    bloom={getBloomValueFromCrop(chemical)}
                />
            )
        })
    }

    const getMixedValueFromMixture = (): number => {
        const {mixture} = props
        if (mixture && mixture.dosages) {
            mixture.dosages.map(dosage => {

                dosage.fertilizer.ingredients.forEach(ingredient => {
                    const chemicalComplex = getChemicalComplexById(ingredient.chemicalComplexId)

                    console.log('ingredient', ingredient);                    
                    console.log('chemicalComplex', chemicalComplex);
                    

                    if (chemicalComplex) {
                        // console.log('chemicalComplex', chemicalComplex.name, chemicalComplex)
                        
                        console.log('toChemicalProportions', chemicalComplex.toChemicalProportions());
                        console.log(' ');
                        
                        
                    }
                })

                return 1
            })
        }
        return 9999
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