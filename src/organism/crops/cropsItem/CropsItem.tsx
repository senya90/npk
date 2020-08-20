import React, {FunctionComponent, useContext} from 'react';
import {Crop} from "../../../models/crop";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";

import style from './cropItem.module.scss'


interface CropsItemProps {
    crop: Crop
    isActive?: boolean
}

const CropsItem: FunctionComponent<CropsItemProps> = (props) => {
    const {onCropSelect} = useContext(CalculatorContext)

    const selectCrop = () => {
        onCropSelect(props.crop)
    }

    const cropStyle = props.isActive ? `${style.crop} ${style.activeCrop}` : style.crop

    return (
        <div onClick={selectCrop} className={cropStyle}>
            {props.crop.name}
        </div>
    );
};

export {CropsItem}