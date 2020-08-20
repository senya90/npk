import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {
    return (
        <div>
            <Title>{translate('tableSolutions')}</Title>
            <Table>
                <TableRaw key={1}/>
                <TableRaw key={2}/>
                <TableRaw key={3}/>
                <TableRaw key={4}/>
                <TableRaw key={5}/>
            </Table>
        </div>
    );
};

export {ChemicalComparison}