import React, {FunctionComponent, useContext} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {chemicalUnitsMock} from "../../mocks/chemicalMock";
import {TableCell} from "../table/tableCell/TableCell";
import {ChemicalComparisonView} from 'molecule/chemicalComparisonView/ChemicalComparisonView';
import {ChemicalUnitValue} from "../../models/chemicalUnitValue/chemicalUnitValue";
import { ChemicalUnit } from 'models/chemicalUnit';
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";
import { Weight } from 'models/weight';
import { AtomsProportionCalculator } from 'models/proportionCalculator';

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {
    const {getChemicalComplexById} = useContext(CalculatorContext)

    const renderChemicalComposition = () => {
        return chemicalUnitsMock.map(chemical => {
            return (
                <ChemicalComparisonView
                    key={chemical.id}
                    chemical={chemical}
                    mixed={9999}
                    vegetation={getVegetationValueFromCrop(chemical)}
                    bloom={getBloomValueFromCrop(chemical)}
                />
            )
        })
    }

    const getMixedValueFromMixture = (): ChemicalUnitValue[] => {
        const {mixture} = props
        if (mixture && mixture.dosages) {
            const allChemicals: ChemicalUnitValue[] = []
            mixture.dosages.forEach(dosage => {
                dosage.fertilizer.ingredients.forEach(ingredient => {
                    const chemicalComplex = getChemicalComplexById(ingredient.chemicalComplexId)

                    if (chemicalComplex) {
                        let atomsProportions = chemicalComplex.toAtomsProportions()
                        const miligrams = Weight.gramToMiligram(dosage.valueGram)

                        let atomsCalculator = new AtomsProportionCalculator(atomsProportions)
                        atomsCalculator.correctDecimalByAggregate(ingredient.percentToDecimal())
                        const chemicalsWeights: ChemicalUnitValue[] = atomsCalculator.toChemicalValueByMiligrams(miligrams)
                        const mergedChemicals = ChemicalUnitValue.merge(chemicalsWeights)
                        
                        allChemicals.push(...mergedChemicals)
                    }
                })
            })
            return ChemicalUnitValue.merge(allChemicals) 
            
        }
        return []
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

    console.log('getMixedValueFromMixture()', getMixedValueFromMixture());
    
    
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