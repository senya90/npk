import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import { MixturesProps } from './SolutionsTypes';

const Solutions: FunctionComponent<MixturesProps> = ({mixtures}) => {

    console.log('mixtures', mixtures)

    return (
        <div>
            <Title>{translate('solutions')}</Title>
            solutions
        </div>
    );
};

export {Solutions}