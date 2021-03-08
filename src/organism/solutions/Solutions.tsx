import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import { SolutionProps } from './SolutionTypes';
import {SolutionDispensing} from "../solutionDispensing/SolutionDispensing";

import style from './solution.module.scss'


const Solutions: FunctionComponent<SolutionProps> = ({solutions}) => {

    const renderMixtures = () => {
        return solutions.map(mixture => <SolutionDispensing key={mixture.id} mixture={mixture}/>)
    }

    return (
        <div>
            <Title>{translate('readySolutions')}</Title>
            <div className={style.mixturesBox}>
                {renderMixtures()}
            </div>
        </div>

    );
};

export {Solutions}