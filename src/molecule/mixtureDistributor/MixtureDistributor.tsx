import React, {FunctionComponent, useContext} from 'react';
import {MixtureDistributorProps} from "./MixtureDistributorTypes";

import style from './mixtureDistributor.module.scss'
import {InputNumber} from "../../atom/inputNumber/InputNumber";
import {DispensingContext, DispensingContextType} from "../../helpers/contexts/DispensingContext";
import {InputTypeValue} from "../../atom/inputNumber/InputNumberTypes";
import {translate} from "../../helpers/translate/translate";


const MixtureDistributor: FunctionComponent<MixtureDistributorProps> = (props) => {
    const {volume, percent = 100} = props
    const {onVolumeChanged, onPercentChanged} = useContext<DispensingContextType>(DispensingContext)

    const changeVolume = (value: InputTypeValue) => {
        onVolumeChanged(Number(value))
    }

    const changePercent = (value: InputTypeValue) => {
        onPercentChanged(Number(value))
    }

    return (
        <div
            className={style.mixtureDistributor}
            {...props}
        >
            <div className={style.inputLine}>
                {translate('forValue')}
                <InputNumber
                    className={style.input}
                    value={volume}
                    onChange={changeVolume}
                />
                {translate('litres')}
            </div>
            <div>
                {translate('forValue')}
                <InputNumber
                    className={style.input}
                    value={percent}
                    onChange={changePercent}
                />
                {translate('dispenserPercent')}
            </div>
        </div>
    );
};

export {MixtureDistributor}