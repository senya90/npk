import React, {FunctionComponent} from 'react';
import {FertilizerIngredient} from "../../models/fertilizerIngredient";
import {chemicalComplexMockArray} from "../../mocks/chemicalComplexMock";

import style from './ingredientView.module.scss'
import {ChemicalComplex} from "../../models/chemicalComplex";


interface IngredientsViewProps {
    ingredients: FertilizerIngredient[],
    fullSize?: boolean
}

const IngredientsView: FunctionComponent<IngredientsViewProps> = (props) => {
    const getChemicalElements = (): ChemicalComplex[] => {
        return chemicalComplexMockArray()
    }

    const renderIngredients = () => {
        return props.ingredients.map(ingredient => {
            const chemicalElement = getChemicalElements().find(element => element.id === ingredient.chemicalComplex.id)
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