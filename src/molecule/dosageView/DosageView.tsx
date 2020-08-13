import React, {FunctionComponent} from 'react';
import {DosageViewProps} from "./DosageViewTypes";

import style from './dosageView.module.scss'
import {Input} from 'atom/input/Input';
import {Icon} from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {commonStyles} from "../../helpers/commonStyle";
import { colors } from 'helpers/commonStyle/colors';


const DosageView: FunctionComponent<DosageViewProps> = ({dosage}) => {
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
                            value={String(dosage.value)}
                        />
                    </div>
                    <div className={style.buttons}>
                        <Icon
                            className={`${colors.positive} ${style.button}`}
                            type={ICON_TYPE.PlusCircle}
                            size={20}
                        />
                        <Icon
                            className={`${colors.negative} ${style.button}`}
                            type={ICON_TYPE.MinusCircle}
                            size={20}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DosageView;