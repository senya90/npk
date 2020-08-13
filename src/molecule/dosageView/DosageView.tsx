import React, {FunctionComponent, useEffect, useState} from 'react';
import {DosageViewProps} from "./DosageViewTypes";

import style from './dosageView.module.scss'
import {Input} from 'atom/input/Input';
import {Icon} from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {commonStyles} from "../../helpers/commonStyle";
import { colors } from 'helpers/commonStyle/colors';


const DosageView: FunctionComponent<DosageViewProps> = ({dosage}) => {
    const [dosageValue, setDosageValue] = useState<number>(dosage.value)

    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDosageValue(Number(e.target.value))
    }

    const increaseValue = () => {
        setDosageValue(dosageValue + 0.01)
    }

    const decreaseValue = () => {
        if (dosageValue - 0.01 <= 0) {
            setDosageValue(0)
            return
        }
        setDosageValue(dosageValue - 0.01)
    }

    useEffect(() => {
        setDosageValue(dosage.value)
    }, [dosage.value])

    return (
        <div className={style.dosageWrapper}>
                <Icon
                    className={style.delete}
                    type={ICON_TYPE.Cross}
                />
            <div className={style.main}>
                <div className={style.name}>{dosage.fertilizer.name}</div>
                <div className={style.dosagePanel}>
                    <div>
                        <div className={commonStyles.text_c}>г/л</div>
                        <Input
                            className={style.dosageValue}
                            value={String(dosageValue)}
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