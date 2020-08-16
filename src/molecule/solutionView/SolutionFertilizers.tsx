import React, {FunctionComponent} from 'react';
import {Dosage} from "../../models/dosage";
import {translate} from "../../helpers/translate/translate";

interface SolutionFertilizersProps {
    dosages: Dosage[]
}

const SolutionFertilizers: FunctionComponent<SolutionFertilizersProps> = ({dosages}) => {
    return (
        <div>
            {dosages.map(dosage => {
                return (
                    <div key={dosage.fertilizer.id}>
                        {dosage.fertilizer.name}: {dosage.value} {translate('gramLiter')}
                    </div>
                )
            })
            }
        </div>
    );
};

export {SolutionFertilizers}