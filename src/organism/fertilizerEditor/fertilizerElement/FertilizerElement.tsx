import React from 'react';
import style from "../fertilizerEditor.module.css";
import {Select} from "../../../atom/select/Select";
import {translate} from "../../../helpers/translate/translate";
import {InputNumber} from "../../../atom/inputNumber/InputNumber";
import {SelectOption} from "../../../atom/select/SelectTypes";
import {AdapterFertilizer} from "../../../helpers/adapterFertilizer/AdapterFertilizer";

const FertilizerElement = (props: any) => {
    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.toSelect(elements)
    }

    return (
        <div className={style.elementsBox}>
            <div className={style.elementLine}>
                <Select
                    default={translate('selectElement')}
                    options={adaptForSelect(props.elementsList)}
                    containerClass={style.element}
                />
                <InputNumber
                    defaultValue={0}
                    isPositive={true}
                    onChange={props.onElementChanged}
                />
            </div>
        </div>
    );
};

export {FertilizerElement}