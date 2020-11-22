import React, {FunctionComponent, useContext} from 'react';
import style from "../fertilizerEditor.module.scss";
import {Select} from "../../../atom/select/Select";
import {translate} from "../../../helpers/translate/translate";
import {InputNumber} from "../../../atom/inputNumber/InputNumber";
import {SelectOption} from "../../../atom/select/SelectTypes";
import {AdapterFertilizer} from "../../../helpers/adapters/adapterFertilizer/AdapterFertilizer";
import {InputTypeValue} from "../../../atom/inputNumber/InputNumberTypes";
import {FertilizerElementProps} from "./FertilizerElementTypes";
import {FertilizerIngredient} from "../../../models/fertilizerIngredient";
import { CalculatorContext } from 'helpers/contexts/CalculatorContext';

const FertilizerElement: FunctionComponent<FertilizerElementProps> = (props) => {

    const {getChemicalComplexById} = useContext(CalculatorContext)

    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.complexToSelect(elements)
    }

    const onNameChange = (chemicalComplexId: string) => {
        const {valuePercent, id} = props.chemical
        const chemicalComplex = getChemicalComplexById(chemicalComplexId)
        const updatedElement = new FertilizerIngredient(chemicalComplex, valuePercent, id)
        props.onChemicalChanged(updatedElement)
    }

    const onValueChange = (value: InputTypeValue) => {
        const {chemicalComplex, id} = props.chemical
        const updatedElement = new FertilizerIngredient(chemicalComplex, Number(value), id )
        props.onChemicalChanged(updatedElement)
    }

    let chemicalComplexId = props.chemical.chemicalComplex.isValid() ? props.chemical.chemicalComplex.id : undefined

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