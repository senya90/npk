import React, {FunctionComponent} from 'react';
import {Dosage} from "../../models/dosage";
import {translate} from "../../helpers/translate/translate";

import style from './mixtureView.module.scss'


interface MixtureFertilizersProps {
    dosages: Dosage[]
}

const MixtureFertilizers: FunctionComponent<MixtureFertilizersProps> = ({dosages}) => {

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

    return (
        <div className={style.fertilizerBox}>
            {renderDosages()}
        </div>
    );
};

export {MixtureFertilizers}