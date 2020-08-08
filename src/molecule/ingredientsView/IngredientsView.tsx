import React, {FunctionComponent} from 'react';
import {FertilizerIngredient} from "../../models/fertilizerIngredient";
import {elementMock} from "../../mocks/elementMock";

import style from './ingredientView.module.scss'

interface IngredientsViewProps {
    composition: FertilizerIngredient[],
}

const IngredientsView: FunctionComponent<IngredientsViewProps> = ({composition}) => {
    const getChemicalElements = () => {
        return elementMock
    }

    const renderIngredients = () => {
        return composition.map(ingredient => {
            const chemicalElement = getChemicalElements().find(element => element.id === ingredient.chemicalId)
            if (chemicalElement) {
                return (
                    <span
                        key={ingredient.id}
                        className={style.ingredient}
                    >
                        {chemicalElement.name} {ingredient.value}
                    </span>
                )
            }
            return null
        })
    }

    return (
        <div>
            {renderIngredients()}
        </div>
    );
};

export {IngredientsView}