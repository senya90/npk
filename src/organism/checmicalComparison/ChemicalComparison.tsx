import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {chemicalUnitsMock} from "../../mocks/chemicalMock";
import {TableCell} from "../table/tableCell/TableCell";

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {

    const renderChemicalComposition = () => {
        return chemicalUnitsMock.map(chemical => (
            <TableRaw>
                <TableCell>{chemical.id}</TableCell>
                <TableCell>{chemical.name}</TableCell>
            </TableRaw>
        ))
    }

    return (
        <div>
            <Title>{translate('tableSolutions')}</Title>
            <Table>
                {renderChemicalComposition()}
            </Table>
        </div>
    );
};

export {ChemicalComparison}