import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {
    return (
        <div>
            <Title>{translate('tableSolutions')}</Title>
        </div>
    );
};

export {ChemicalComparison}