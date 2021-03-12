import React, {FunctionComponent, useContext} from 'react';
import {Agriculture} from "../../../models/agriculture";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";
import cn from 'classnames'

import style from './agricultureItem.module.scss'
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../../atom/icon/IconTypes";


interface AgricultureItemProps {
    agriculture: Agriculture
    isActive?: boolean
    onEdit: (agriculture: Agriculture) => void
    onDelete: (agriculture: Agriculture) => void
}

const AgricultureItem: FunctionComponent<AgricultureItemProps> = ({agriculture, isActive, onEdit, onDelete}) => {
    const {onAgricultureSelect} = useContext(CalculatorContext)

    const selectAgriculture = () => {
        onAgricultureSelect(agriculture)
    }

    const edit = () => {
        onEdit(agriculture)
    }

    const deleteAgriculture = () => {
        onDelete(agriculture)
    }

    return (
        <div
            onClick={selectAgriculture}
            className={cn(style.agriculture, {[style.activeAgriculture]: isActive})}>
            {agriculture.name}
            <div className={style.controls}>
                <Icon
                    onClick={edit}
                    type={ICON_TYPE.Edit}
                    className={style.controlsIcon}
                    size={18}
                />
                <Icon
                    type={ICON_TYPE.Delete}
                    className={style.controlsIcon}
                    size={18}
                    onClick={deleteAgriculture}
                />
            </div>

        </div>
    );
};

export {AgricultureItem}