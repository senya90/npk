import React, {FunctionComponent, useContext} from 'react';
import cn from 'classnames'
import {FertilizerIngredient} from "../../models/fertilizerIngredient";

import style from './ingredientView.module.scss'
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";


interface IngredientsViewProps {
    ingredients: FertilizerIngredient[],
    fullSize?: boolean
}

const IngredientsView: FunctionComponent<IngredientsViewProps> = ({ingredients, fullSize}) => {
    const {chemicalComplexes} = useContext(CalculatorContext)

    const renderIngredients = () => {
        return ingredients.map((ingredient, index) => {
            const chemicalElement = chemicalComplexes.find(element => element.id === ingredient.chemicalComplex.id)
            if (chemicalElement) {
                return (
                    <span
                        key={ingredient.id}
                        className={cn(style.ingredient, {[style.ingredient_underline]: !fullSize})}
                    >
                        <span className={style.chemicalName}>{chemicalElement.name}</span>
                        <span className={style.chemicalValue}>{ingredient.valuePercent}%</span>
                    </span>
                )
            }
            return null
        })
    }

    const ingredientsWrapperStyle = cn(
        style.ingredientsWrapper,
        {[style.fullSize]: fullSize}
    )

    return (
        <div className={ingredientsWrapperStyle}>
            {renderIngredients()}
        </div>
    );
};

export {IngredientsView}