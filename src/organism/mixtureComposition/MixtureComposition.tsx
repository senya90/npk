import React, {FunctionComponent} from 'react';
import {MixtureCompositionProps} from "./MixtureCompositionTypes";
import {translate} from "../../helpers/translate/translate";
import Title from "../../atom/title/Title";

const MixtureComposition: FunctionComponent<MixtureCompositionProps> = () => {
    return (
        <div>
            <Title>{translate('mixtureComposition')}</Title>
            
        </div>
    );
};

export {MixtureComposition}