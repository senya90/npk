import React, {FunctionComponent} from 'react';
import {TableRaw} from "../../organism/table/tableRow/TableRaw";
import {TableCell} from "../../organism/table/tableCell/TableCell";
import {ChemicalUnit} from "../../models/chemicalUnit";
import { Utils } from 'helpers/utils';
import cn from 'classnames'
import style from './chemicalComparisonView.module.scss'

interface ChemicalComparisonViewProps {
    chemical: ChemicalUnit
    mixed: number
    vegetation: number
    bloom: number
}

const ChemicalComparisonView: FunctionComponent<ChemicalComparisonViewProps> = (props) => {

    const mixed = Utils.round(props.mixed, 1)
    const vegetation = Utils.round(props.vegetation, 1)
    const bloom = Utils.round(props.bloom, 1)

    const getFadeStyle = (fieldValue: number): string => {
        return cn({[style.fade]: fieldValue === 0})
    }

    return (
            <TableRaw>
                <TableCell>{props.chemical.name}</TableCell>
                <TableCell className={getFadeStyle(mixed)}>{mixed}</TableCell>
                <TableCell className={getFadeStyle(vegetation)}>{vegetation}</TableCell>
                <TableCell className={getFadeStyle(bloom)}>{bloom}</TableCell>
            </TableRaw>
    );
};

export {ChemicalComparisonView}