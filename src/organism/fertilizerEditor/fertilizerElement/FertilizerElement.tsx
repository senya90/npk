import React, {FunctionComponent} from 'react';
import style from "../fertilizerEditor.module.scss";
import {Select} from "../../../atom/select/Select";
import {translate} from "../../../helpers/translate/translate";
import {InputNumber} from "../../../atom/inputNumber/InputNumber";
import {SelectOption} from "../../../atom/select/SelectTypes";
import {AdapterFertilizer} from "../../../helpers/adapters/adapterFertilizer/AdapterFertilizer";
import {InputTypeValue} from "../../../atom/inputNumber/InputNumberTypes";
import {FertilizerElementProps} from "./FertilizerElementTypes";
import {FertilizerIngredient} from "../../../models/fertilizerIngredient";

const FertilizerElement: FunctionComponent<FertilizerElementProps> = (props) => {
    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.toSelect(elements)
    }

    const onNameChange = (chemicalComplexId: string) => {
        const {valuePercent, id} = props.chemical
        const updatedElement = new FertilizerIngredient(chemicalComplexId, valuePercent, id)
        props.onChemicalChanged(updatedElement)
    }

    const onValueChange = (value: InputTypeValue) => {
        const {chemicalComplexId, id} = props.chemical
        const updatedElement = new FertilizerIngredient(chemicalComplexId, Number(value), id )
        props.onChemicalChanged(updatedElement)
    }

    const chemicalComplexId = props.chemical.chemicalComplexId ? props.chemical.chemicalComplexId : undefined

    return (
        <div className={style.elementsBox}>
            <div className={style.elementLine}>
                <Select
                    default={translate('selectElement')}
                    value={chemicalComplexId}
                    options={adaptForSelect(props.chemicalList)}
                    containerclass={style.element}
                    onChange={onNameChange}
                />
                <InputNumber
                    defaultValue={0}
                    value={props.chemical.valuePercent}
                    isPositive={true}
                    onChange={onValueChange}
                />
            </div>
        </div>
    );
};

export {FertilizerElement}