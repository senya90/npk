import React, {FunctionComponent} from 'react';
import {TableRaw} from "../../organism/table/tableRow/TableRaw";
import {TableCell} from "../../organism/table/tableCell/TableCell";
import {ChemicalUnit} from "../../models/chemicalUnit";
import {Crop} from "../../models/crop";
import {ChemicalUnitValue} from "../../models/chemicalUnitValue";

interface ChemicalComparisonViewProps {
    chemical: ChemicalUnit
    activeCrop: Crop
}

const ChemicalComparisonView: FunctionComponent<ChemicalComparisonViewProps> = ({chemical, activeCrop}) => {
    console.log('activeCrop', activeCrop)

    const getVegetationValue = () => {
        return _ejectResult(_findIn(activeCrop.vegetation))
    }

    const getBloomValue = () => {
        return _ejectResult(_findIn(activeCrop.bloom))
    }

    const _findIn = (source?: ChemicalUnitValue[], ): ChemicalUnitValue | undefined => {
        if (source) {
            return source.find(veg => veg.chemicalUnit.id === chemical.id)
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
            <TableRaw key={chemical.id}>
                <TableCell>{chemical.name}</TableCell>
                <TableCell></TableCell>
                <TableCell>{getVegetationValue()}</TableCell>
                <TableCell>{getBloomValue()}</TableCell>
            </TableRaw>
    );
};

export {ChemicalComparisonView}