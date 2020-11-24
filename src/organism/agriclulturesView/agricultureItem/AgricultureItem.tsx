import React, {FunctionComponent, useContext} from 'react';
import {Agriculture} from "../../../models/agriculture";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";
import cn from 'classnames'

import style from './agricultureItem.module.scss'


interface AgricultureItemProps {
    agriculture: Agriculture
    isActive?: boolean
}

const AgricultureItem: FunctionComponent<AgricultureItemProps> = (props) => {
    const {onAgricultureSelect} = useContext(CalculatorContext)

    const selectAgriculture = () => {
        onAgricultureSelect(props.agriculture)
    }

    return (
        <div onClick={selectAgriculture} className={cn(style.agriculture, {[style.activeAgriculture]: props.isActive})}>
            {props.agriculture.name}
        </div>
    );
};

export {AgricultureItem}