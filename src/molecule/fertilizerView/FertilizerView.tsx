import React, {FunctionComponent, useContext, useState} from 'react';
import {Fertilizer} from "../../models/fertilizer";
import {IngredientsView} from "../ingredientsView/IngredientsView";

import style from './fertilizerView.module.scss'
import {Icon} from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";

interface FertilizerViewProps {
    fertilizer: Fertilizer
}

const FertilizerView: FunctionComponent<FertilizerViewProps> = ({fertilizer}) => {
    const [active, setActive] = useState<boolean>(false)
    const {onDeleteFertilizer, onEditFertilizer} = useContext(CalculatorContext)

    const toggleActive = (e: React.MouseEvent<HTMLDivElement>) => {
        setActive(!active)
    }

    const editFertilizer = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEditFertilizer(fertilizer.id)
    }

    const deleteFertilizer = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDeleteFertilizer(fertilizer.id)
    }

    const footerStyle = active ? `${style.footer} ${style.activeFooter}` : style.footer

    return (
        <div className={style.fertilizer} onClick={toggleActive}>
            <div className={style.name}>{fertilizer.name}</div>
            <Icon
                className={style.addToMixture}
                type={ICON_TYPE.RightOutlined}
            />
            <div className={footerStyle}>
                <IngredientsView
                    ingredients={fertilizer.ingredients}
                    fullSize={active}
                />
                {active &&
                <div>
                    <Icon
                        type={ICON_TYPE.Edit}
                        size={20}
                        className={style.icon}
                        onClick={editFertilizer}
                    />
                    <Icon
                        type={ICON_TYPE.Delete}
                        size={20}
                        className={`${style.icon}`}
                        onClick={deleteFertilizer}
                    />
                </div>
                }

            </div>

        </div>
    );
};

export {FertilizerView}