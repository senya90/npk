import React, {FunctionComponent} from 'react';
import {Dosage} from "../../models/dosage";
import {translate} from "../../helpers/translate/translate";

import style from './mixtureDispensing.module.scss'
import {MixtureDistributor} from "../../molecule/mixtureDistributor/MixtureDistributor";


interface MixtureFertilizersProps {
    dosages: Dosage[]
    volume?: number
    percent?: number
}

const MixtureFertilizers: FunctionComponent<MixtureFertilizersProps> = ({dosages, volume= 0, percent= 100}) => {

    const renderDosages = () => {
        return dosages.map(dosage => {
            return (
                <div className={style.fertilizerLine} key={dosage.fertilizer.id}>
                    <span className={style.name}>{dosage.fertilizer.name}</span>
                    <span className={style.value}>{dosage.value} {translate('gramLiter')}</span>
                </div>
            )
        })
    }

    const renderDosagesValueByVolume = () => {
        return dosages.map(dosage => {
            return (
                <div key={dosage.fertilizer.id} className={style.fertilizerLine}>
                    {dosage.value * volume} {translate('gramLiter')}
                </div>
            )
        })
    }

    return (
        <div className={style.fertilizerBox}>
            <div className={style.fertilizerPreview}>
                {renderDosages()}
            </div>
            <div className={style.fertilizerCalculated}>
                {renderDosagesValueByVolume()}
            </div>
            <MixtureDistributor
                percent={percent}
                volume={volume}
            />
        </div>

    );
};

export {MixtureFertilizers}