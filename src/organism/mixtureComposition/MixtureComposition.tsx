import React, {FunctionComponent} from 'react';
import {MixtureCompositionProps} from "./MixtureCompositionTypes";
import {translate} from "../../helpers/translate/translate";
import Title from "../../atom/title/Title";
import DosageView from "../../molecule/dosageView/DosageView";

const MixtureComposition: FunctionComponent<MixtureCompositionProps> = ({mixture}) => {

    const renderMixture = () => {
        if (!mixture) {
            return null
        }

        return mixture.dosages.map(dosage => (
            <DosageView key={dosage.fertilizer.id} dosage={dosage} />
        ))
    }

    console.log('mixture', mixture)

    return (
        <div>
            <Title>{translate('mixtureComposition')}</Title>
            {mixture &&
                renderMixture()
            }
        </div>
    );
};

export {MixtureComposition}