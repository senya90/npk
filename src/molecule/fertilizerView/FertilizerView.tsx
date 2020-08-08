import React, {FunctionComponent} from 'react';
import {Fertilizer} from "../../models/fertilizer";
import {IngredientsView} from "../ingredientsView/IngredientsView";
import {fonts} from "../../helpers/styles/fonts";

import style from './fertilizerView.module.scss'

interface FertilizerViewProps {
    fertilizer: Fertilizer
}

const FertilizerView: FunctionComponent<FertilizerViewProps> = ({fertilizer}) => {
    return (
        <div className={style.fertilizer}>
            <div className={fonts.font_md}>{fertilizer.name}</div>
            <IngredientsView ingredients={fertilizer.ingredients} />
        </div>
    );
};

export {FertilizerView}