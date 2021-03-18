import React, {FunctionComponent} from 'react';
import {Title} from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import { SolutionProps } from './SolutionTypes';
import {SolutionDispensing} from "../solutionDispensing/SolutionDispensing";

import style from './solution.module.scss'


const Solutions: FunctionComponent<SolutionProps> = ({solutions}) => {

    const renderSolutions = () => {
        return solutions.map(solution => <SolutionDispensing key={solution.id} solution={solution}/>)
    }

    return (
        <div>
            <Title>{translate('readySolutions')}</Title>
            <div className={style.solutionsBox}>
                {renderSolutions()}
            </div>
        </div>

    );
};

export {Solutions}