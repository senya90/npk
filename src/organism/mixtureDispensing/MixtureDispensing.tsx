import React, {FunctionComponent} from 'react';
import { Mixture } from 'models/mixture';
import {MixtureFertilizers} from "./MixtureFertilizers";

import style from './mixtureDispensing.module.scss'
import {MixtureDistributor} from "../../molecule/mixtureDistributor/MixtureDistributor";


interface MixtureDispensingProps {
    mixture: Mixture
}

const MixtureDispensing: FunctionComponent<MixtureDispensingProps> = ({mixture}) => {

    return (
        <div className={style.mixture}>
            <div className={style.mixtureName}>{mixture.name}</div>
            {mixture &&
                <>
                    <MixtureFertilizers
                        dosages={mixture.dosages}
                        volume={2}
                    />
                </>
            }
        </div>
    );
};

export {MixtureDispensing}