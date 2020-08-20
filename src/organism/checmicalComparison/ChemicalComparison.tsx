import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {chemicalUnitsMock} from "../../mocks/chemicalMock";
import {TableCell} from "../table/tableCell/TableCell";
import {ChemicalComparisonView} from 'molecule/chemicalComparisonView/ChemicalComparisonView';

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {

    const renderChemicalComposition = () => {
        return chemicalUnitsMock.map(chemical => (
            <ChemicalComparisonView
                key={chemical.id}
                chemical={chemical}
                activeCrop={props.activeCrop}
            />
        ))
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