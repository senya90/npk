import React, {FunctionComponent} from 'react';
import { Mixture } from 'models/mixture';

interface SolutionViewProps {
    solution: Mixture
}

const SolutionView: FunctionComponent<SolutionViewProps> = ({solution}) => {

    return (
        <div>
            {solution &&
                <>
                    <div>{solution.name}</div>
                    <div>{solution.id}</div>
                </>
            }
        </div>
    );
};

export {SolutionView}