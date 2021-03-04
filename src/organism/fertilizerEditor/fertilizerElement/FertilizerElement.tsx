import React, {FunctionComponent, useContext} from 'react';
import style from "../fertilizerEditor.module.scss";
import {Select} from "../../../atom/select/Select";
import {translate} from "../../../helpers/translate/translate";
import {InputNumber} from "../../../atom/inputNumber/InputNumber";
import {SelectOption} from "../../../atom/select/SelectTypes";
import {AdapterFertilizer} from "../../../helpers/adapters/adapterFertilizer/AdapterFertilizer";
import {InputTypeValue} from "../../../atom/inputNumber/InputNumberTypes";
import {FertilizerElementProps} from "./FertilizerElementTypes";
import {FertilizerIngredient} from "../../../models/fertilizer/fertilizerIngredient";
import { CalculatorContext } from 'helpers/contexts/CalculatorContext';
import { Button } from 'atom/button/Button';
import { BUTTON_SHAPE, BUTTON_TYPE } from 'atom/button/ButtonTypes';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../../atom/icon/IconTypes";

const FertilizerElement: FunctionComponent<FertilizerElementProps> = ({ingredient, onChemicalChanged, chemicalComplexList, onDeleteIngredient}) => {

    const {getChemicalComplexById} = useContext(CalculatorContext)

    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.complexToSelect(elements)
    }

    const onNameChange = (chemicalComplexId: string) => {
        const {valuePercent, id} = ingredient
        const chemicalComplex = getChemicalComplexById(chemicalComplexId)
        const updatedElement = new FertilizerIngredient(chemicalComplex, valuePercent, id)
        onChemicalChanged(updatedElement)
    }

    const onPercentChange = (value: InputTypeValue) => {
        const {chemicalComplex, id} = ingredient
        const updatedElement = new FertilizerIngredient(chemicalComplex, Number(value), id)
        onChemicalChanged(updatedElement)
    }

    const deleteIngredient = () => {
        onDeleteIngredient(ingredient)
    }

    let chemicalComplexId = ingredient.chemicalComplex.isValid() ? ingredient.chemicalComplex.id : undefined

    return (
        <div className={style.elementsBox}>
            <div className={style.elementLine}>
                <Select
                    default={translate('selectElement')}
                    value={chemicalComplexId}
                    options={adaptForSelect(chemicalComplexList)}
                    containerclass={style.element}
                    onChange={onNameChange}
                />
                <InputNumber
                    defaultValue={0}
                    value={ingredient.valuePercent}
                    isPositive={true}
                    onChange={onPercentChange}
                />
            </div>
            <Button
                className={style.deleteIngredient}
                shape={BUTTON_SHAPE.CIRCLE}
                type={BUTTON_TYPE.PRIMARY}
                onClick={deleteIngredient}
            >
                <Icon type={ICON_TYPE.Cross}/>
            </Button>
        </div>
    );
};

export {FertilizerElement}