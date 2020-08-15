import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import { MixturesProps } from './SolutionsTypes';
import {SolutionView} from "../../molecule/solutionView/SolutionView";

const Solutions: FunctionComponent<MixturesProps> = ({mixtures}) => {

    const renderSolutions = () => {
        return mixtures.map(mixture => <SolutionView key={mixture.id} solution={mixture}/>)
    }

    console.log('mixtures', mixtures)

    return (
        <div>
            <Title>{translate('solutions')}</Title>
            {renderSolutions()}
        </div>
    );
};

export {Solutions}