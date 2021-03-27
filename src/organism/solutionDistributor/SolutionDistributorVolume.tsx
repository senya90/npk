import React, {FunctionComponent} from 'react';
import style from "../solutionDispensing/solutionDispensing.module.scss";
import {translate} from "../../helpers/translate/translate";
import { Dosage } from 'models/dosage/dosage';
import { Utils } from 'helpers/utils';

interface SolutionDistributorVolumeProps {
    dosage: Dosage
    volume: number,
    percent?: number
}

const SolutionDistributorVolume: FunctionComponent<SolutionDistributorVolumeProps> = ({dosage, volume, percent}) => {

    const calculateVolume = (): number => {
        if (!percent) {
            return Utils.round(dosage.valueGram * volume, 2)
        }

        return Utils.round(
            (dosage.valueGram * (percent / 100)) * volume,
            2
        )
    }

    return (
        <div className={style.fertilizerLine}>
            {Utils.round(calculateVolume())} <span className={style.measure}>&nbsp;{translate('gramLiter')}</span>
        </div>
    );
};

export {SolutionDistributorVolume}