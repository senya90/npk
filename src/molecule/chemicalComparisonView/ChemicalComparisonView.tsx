import React, {FunctionComponent} from 'react';
import {TableRaw} from "../../organism/table/tableRow/TableRaw";
import {TableCell} from "../../organism/table/tableCell/TableCell";
import {ChemicalUnit} from "../../models/chemicalUnit";
import { Utils } from 'helpers/utils';

interface ChemicalComparisonViewProps {
    chemical: ChemicalUnit
    mixed: number
    vegetation: number
    bloom: number
}

const ChemicalComparisonView: FunctionComponent<ChemicalComparisonViewProps> = (props) => {

    return (
            <TableRaw>
                <TableCell>{props.chemical.name}</TableCell>
                <TableCell>{Utils.round(props.mixed, 1)}</TableCell>
                <TableCell>{Utils.round(props.vegetation,1)}</TableCell>
                <TableCell>{Utils.round(props.bloom,1)}</TableCell>
            </TableRaw>
    );
};

export {ChemicalComparisonView}