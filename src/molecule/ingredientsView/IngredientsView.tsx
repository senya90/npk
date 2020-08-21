import React, {FunctionComponent} from 'react';
import {FertilizerIngredient} from "../../models/fertilizerIngredient";
import {elementMock} from "../../mocks/elementMock";

import style from './ingredientView.module.scss'


interface IngredientsViewProps {
    ingredients: FertilizerIngredient[],
    fullSize?: boolean
}

const IngredientsView: FunctionComponent<IngredientsViewProps> = (props) => {
    const getChemicalElements = () => {
        return elementMock
    }

    const renderIngredients = () => {
        return props.ingredients.map(ingredient => {
            const chemicalElement = getChemicalElements().find(element => element.id === ingredient.chemicalId)
            if (chemicalElement) {
                return (
                    <span
                        key={ingredient.id}
                        className={style.ingredient}
                    >
                        <span className={style.chemicalName}>{chemicalElement.name}</span>
                        <span className={style.chemicalValue}>{ingredient.valuePercent}%</span>
                    </span>
                )
            }
            return null
        })
    }

    const ingredientsWrapperStyle = props.fullSize ? `${style.fullSize} ${style.ingredientsWrapper}` : style.ingredientsWrapper

    return (
        <div className={ingredientsWrapperStyle}>
            {renderIngredients()}
        </div>
    );
};

export {IngredientsView}