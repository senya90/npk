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
import { ChemicalAtomProportion } from 'models/chemicalAtomProportion';
import { Weight } from 'models/weight';
import { ProportionCalculator } from 'models/proportionCalculator';

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
            mixture.dosages.map(dosage => {
                console.log('Dosage', dosage.fertilizer.name, dosage);                

                dosage.fertilizer.ingredients.forEach(ingredient => {
                    const chemicalComplex = getChemicalComplexById(ingredient.chemicalComplexId)

                    console.log('ingredient', ingredient);                    
                    console.log('chemicalComplex', chemicalComplex);
                    

                    if (chemicalComplex) {
                        // console.log('chemicalComplex', chemicalComplex.name, chemicalComplex)
                        let splittedChemicalsProportions = chemicalComplex.toAtomsProportions()
                        let proportionCalculator = new ProportionCalculator(splittedChemicalsProportions)
                        proportionCalculator.chemicalProportions = proportionCalculator.correctDecimalByAggregate(ingredient.percentToDecimal())
                        const atoms: ChemicalAtomProportion[] = proportionCalculator.toAtoms()
                        const miligrams = Weight.gramToMiligram(dosage.valueGram)
                        const chemicalsWeights: ChemicalUnitValue[] = atoms.map(atom => {
                            return atom.toChemicalByMiligrams(miligrams)
                        })
                        
                        console.log('chemicalsProportions 2 ', splittedChemicalsProportions);
                        console.log('chemicalsWeights',chemicalsWeights);
                        console.log(' ');
                    }
                })
                console.log('----------------------------------------------------------------------------------------------------------------------');
                

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