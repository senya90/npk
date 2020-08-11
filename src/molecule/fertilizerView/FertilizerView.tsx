import React, {FunctionComponent} from 'react';
import {Fertilizer} from "../../models/fertilizer";
import {IngredientsView} from "../ingredientsView/IngredientsView";
import {fonts} from "../../helpers/commonStyle/fonts";

import style from './fertilizerView.module.scss'
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";

interface FertilizerViewProps {
    fertilizer: Fertilizer
}

const FertilizerView: FunctionComponent<FertilizerViewProps> = ({fertilizer}) => {
    return (
        <div className={style.fertilizer}>
            <div className={fonts.font_md}>{fertilizer.name}</div>
            <IngredientsView ingredients={fertilizer.ingredients} />
            <Icon
                className={style.addToMixture}
                type={ICON_TYPE.RightOutlined}
            />
        </div>
    );
};

export {FertilizerView}