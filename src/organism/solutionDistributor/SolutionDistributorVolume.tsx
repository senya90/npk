import React, {FunctionComponent} from 'react';
import style from "../solutionDispensing/solutionDispensing.module.scss";
import {translate} from "../../helpers/translate/translate";
import { Dosage } from 'models/dosage';
import { Utils } from 'helpers/utils';

interface MixtureDistributorVolumeProps {
    dosage: Dosage
    volume: number,
    percent?: number
}

const SolutionDistributorVolume: FunctionComponent<MixtureDistributorVolumeProps> = ({dosage, volume, percent}) => {

    const calculateVolume = (): number => {
        if (!percent) {
            return dosage.valueGram * volume
        }

        return (dosage.valueGram * (percent / 100)) * volume
    }

    return (
        <div className={style.fertilizerLine}>
            {Utils.round(calculateVolume())} {translate('gramLiter')}
        </div>
    );
};

export {SolutionDistributorVolume}