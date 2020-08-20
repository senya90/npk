import React, {FunctionComponent, useContext} from 'react';
import {Crop} from "../../../models/crop";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";

interface CropsItemProps {
    crop: Crop
}

const CropsItem: FunctionComponent<CropsItemProps> = (props) => {
    const {onCropSelect} = useContext(CalculatorContext)

    const selectCrop = () => {
        onCropSelect(props.crop)
    }

    return (
        <div onClick={selectCrop}>
            {props.crop.name}
        </div>
    );
};

export {CropsItem}