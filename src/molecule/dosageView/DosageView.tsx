import React, {FunctionComponent} from 'react';
import {DosageViewProps} from "./DosageViewTypes";

import style from './dosageView.module.scss'
import {Input} from 'atom/input/Input';
import {Icon} from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {commonStyles} from "../../helpers/commonStyle";
import { colors } from 'helpers/commonStyle/colors';
import { Dosage } from 'models/dosage';
import { Utils } from 'helpers/utils';


const DosageView: FunctionComponent<DosageViewProps> = ({dosage, deleteFertilizerFromMixture, onDosageChanged}) => {

    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDosageChanged(updateDosageByValue(Number(e.target.value)))
    }

    const increaseValue = () => {
        onDosageChanged(updateDosageByValue(dosage.value + 0.01))
    }

    const decreaseValue = () => {
        let newValue = dosage.value - 0.01
        if (newValue <= 0) {
            newValue = 0
        }
        onDosageChanged(updateDosageByValue(newValue))
    }

    const updateDosageByValue = (toValue: number): Dosage => {
        return {...dosage, value: Utils.round(toValue)}
    }

    const deleteFertilizer = () => {
        deleteFertilizerFromMixture(dosage.fertilizer)
    }

    return (
        <div className={style.dosageWrapper}>
                <Icon
                    className={style.delete}
                    type={ICON_TYPE.Cross}
                    onClick={deleteFertilizer}
                />
            <div className={style.main}>
                <div className={style.name}>{dosage.fertilizer.name}</div>
                <div className={style.dosagePanel}>
                    <div>
                        <div className={commonStyles.text_c}>г/л</div>
                        <Input
                            className={style.dosageValue}
                            value={String(dosage.value)}
                            onChange={inputValue}
                        />
                    </div>
                    <div className={style.buttons}>
                        <Icon
                            className={`${colors.positive} ${style.button}`}
                            type={ICON_TYPE.PlusCircle}
                            size={20}
                            onClick={increaseValue}
                        />
                        <Icon
                            className={`${colors.negative} ${style.button}`}
                            type={ICON_TYPE.MinusCircle}
                            size={20}
                            onClick={decreaseValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DosageView;