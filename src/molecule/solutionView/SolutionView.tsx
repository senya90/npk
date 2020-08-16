import React, {FunctionComponent} from 'react';
import { Mixture } from 'models/mixture';
import {SolutionFertilizers} from "./SolutionFertilizers";

import style from './solutionView.module.scss'


interface SolutionViewProps {
    solution: Mixture
}

const SolutionView: FunctionComponent<SolutionViewProps> = ({solution}) => {

    return (
        <div>
            <div className={style.solutionName}>{solution.name}</div>
            {solution &&
                <SolutionFertilizers
                    dosages={solution.dosages}
                />
            }
        </div>
    );
};

export {SolutionView}