import React, {FunctionComponent, useState} from 'react';
import {Mixture} from 'models/mixture';
import {MixtureFertilizers} from "./MixtureFertilizers";

import style from './mixtureDispensing.module.scss'
import { DispensingContext } from 'helpers/contexts/DispensingContext';


interface MixtureDispensingProps {
    mixture: Mixture
}

const MixtureDispensing: FunctionComponent<MixtureDispensingProps> = ({mixture}) => {
    const [volume, setVolume] = useState<number>(0)

    const onVolumeChanged = (volume: number) => {
        setVolume(volume)
    }

    return (
        <div className={style.mixture}>
            {mixture &&
                <>
                    <div className={style.mixtureName}>{mixture.name}</div>
                    <DispensingContext.Provider value={{
                        onVolumeChanged: onVolumeChanged
                    }}>
                        <MixtureFertilizers
                            dosages={mixture.dosages}
                            volume={volume}
                        />
                    </DispensingContext.Provider>

                </>
            }
        </div>
    );
};

export {MixtureDispensing}