import React, {FunctionComponent} from 'react';
import {DosageViewProps} from "./DosageViewTypes";

import style from './dosageView.module.scss'
import {Icon} from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {commonStyles} from "../../helpers/commonStyle";
import { colors } from 'helpers/commonStyle/colors';
import { Dosage } from 'models/dosage';
import { Utils } from 'helpers/utils';
import { translate } from 'helpers/translate/translate';
import { InputNumber } from 'atom/inputNumber/InputNumber';
import {InputTypeValue} from "../../atom/inputNumber/InputNumberTypes";


const DosageView: FunctionComponent<DosageViewProps> = ({dosage, deleteFertilizerFromSolution, onDosageChanged}) => {

    const inputValue = (value: InputTypeValue) => {
        onDosageChanged(updateDosageByValue(Number(value)))
    }

    const increaseValue = () => {
        onDosageChanged(updateDosageByValue(dosage.valueGram + 0.01))
    }

    const decreaseValue = () => {
        let newValue = dosage.valueGram - 0.01
        if (newValue <= 0) {
            newValue = 0
        }
        onDosageChanged(updateDosageByValue(newValue))
    }

    const updateDosageByValue = (toValue: number): Dosage => {
        return new Dosage(dosage.fertilizer, Utils.round(toValue), dosage.id)
    }

    const deleteFertilizer = () => {
        deleteFertilizerFromSolution(dosage.fertilizer)
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
                        <div className={commonStyles.text_c}>{translate('gramLiter')}</div>
                        <InputNumber
                            className={style.dosageValue}
                            value={dosage.valueGram}
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