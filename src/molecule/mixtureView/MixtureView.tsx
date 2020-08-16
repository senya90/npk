import React, {FunctionComponent} from 'react';
import { Mixture } from 'models/mixture';
import {MixtureFertilizers} from "./MixtureFertilizers";

import style from './mixtureView.module.scss'


interface MixtureViewProps {
    mixture: Mixture
}

const MixtureView: FunctionComponent<MixtureViewProps> = ({mixture}) => {

    return (
        <div className={style.mixture}>
            <div className={style.mixtureName}>{mixture.name}</div>
            {mixture &&
                <MixtureFertilizers
                    dosages={mixture.dosages}
                />
            }
        </div>
    );
};

export {MixtureView}