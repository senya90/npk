import React, {FunctionComponent} from 'react';
import style from "../fertilizerEditor.module.scss";
import {Select} from "../../../atom/select/Select";
import {translate} from "../../../helpers/translate/translate";
import {InputNumber} from "../../../atom/inputNumber/InputNumber";
import {SelectOption} from "../../../atom/select/SelectTypes";
import {AdapterFertilizer} from "../../../helpers/adapterFertilizer/AdapterFertilizer";
import {InputTypeValue} from "../../../atom/inputNumber/InputNumberTypes";
import {FertilizerElementProps} from "./FertilizerElementTypes";
import {FertilizerIngredient} from "../../../models/fertilizerIngredient";

const FertilizerElement: FunctionComponent<FertilizerElementProps> = (props) => {
    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.toSelect(elements)
    }

    const onNameChange = (chemicalElementId: string) => {
        const {value, id} = props.element
        const updatedElement = new FertilizerIngredient(chemicalElementId, value, id )
        props.onElementChanged(updatedElement)
    }

    const onValueChange = (value: InputTypeValue) => {
        const {chemicalId, id} = props.element
        const updatedElement = new FertilizerIngredient(chemicalId, Number(value), id )
        props.onElementChanged(updatedElement)
    }

    const chemicalId = props.element.chemicalId ? props.element.chemicalId : undefined

    return (
        <div className={style.elementsBox}>
            <div className={style.elementLine}>
                <Select
                    default={translate('selectElement')}
                    value={chemicalId}
                    options={adaptForSelect(props.elementsList)}
                    containerclass={style.element}
                    onChange={onNameChange}
                />
                <InputNumber
                    defaultValue={0}
                    value={props.element.value}
                    isPositive={true}
                    onChange={onValueChange}
                />
            </div>
        </div>
    );
};

export {FertilizerElement}