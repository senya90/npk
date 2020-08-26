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

    const getMixedValueFromMixture = (): number => {
        const {mixture} = props
        if (mixture && mixture.dosages) {
            const allChemicals: ChemicalUnitValue[] = []
            mixture.dosages.map(dosage => {
                console.log('Dosage', dosage.fertilizer.name, dosage);                

                dosage.fertilizer.ingredients.forEach(ingredient => {
                    const chemicalComplex = getChemicalComplexById(ingredient.chemicalComplexId)

                    // console.log('ingredient', ingredient);                    
                    // console.log('chemicalComplex', chemicalComplex);
                    

                    if (chemicalComplex) {
                        // console.log('chemicalComplex', chemicalComplex.name, chemicalComplex)
                        let atomsProportions = chemicalComplex.toAtomsProportions()
                        const miligrams = Weight.gramToMiligram(dosage.valueGram)

                        let atomsCalculator = new AtomsProportionCalculator(atomsProportions)
                        atomsCalculator.correctDecimalByAggregate(ingredient.percentToDecimal())
                        const chemicalsWeights: ChemicalUnitValue[] = atomsCalculator.toChemicalValueByMiligrams(miligrams)

                        ChemicalUnitValue.merge(chemicalsWeights)
                        
                        // console.log('chemicalsProportions 2 ', atomsProportions);
                        // console.log('chemicalsWeights',chemicalsWeights);
                        console.log(' ');
                        allChemicals.push(...chemicalsWeights)
                    }
                })
                console.log('----------------------------------------------------------------------------------------------------------------------');
                

                return 1
            })
            console.log('!!!allChemicals', allChemicals);
            
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

    getMixedValueFromMixture()
    
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