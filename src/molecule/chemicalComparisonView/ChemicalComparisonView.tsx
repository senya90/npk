import React, {FunctionComponent} from 'react';
import {TableRaw} from "../../organism/table/tableRow/TableRaw";
import {TableCell} from "../../organism/table/tableCell/TableCell";
import {ChemicalUnit} from "../../models/chemicalUnit";

interface ChemicalComparisonViewProps {
    chemical: ChemicalUnit
    vegetation: number
    bloom: number
}

const ChemicalComparisonView: FunctionComponent<ChemicalComparisonViewProps> = (props) => {

    return (
            <TableRaw>
                <TableCell>{props.chemical.name}</TableCell>
                <TableCell>0000</TableCell>
                <TableCell>{props.vegetation}</TableCell>
                <TableCell>{props.bloom}</TableCell>
            </TableRaw>
    );
};

export {ChemicalComparisonView}