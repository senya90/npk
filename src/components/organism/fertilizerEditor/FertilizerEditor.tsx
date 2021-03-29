import React, {FunctionComponent, useEffect, useState} from 'react';
import { Button } from 'components/atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'components/atom/button/ButtonTypes';
import { Input } from 'components/atom/input/Input';

import style from './fertilizerEditor.module.scss'
import {commonStyles} from "../../../helpers/commonStyle";
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {FertilizerIngredient} from "../../../models/fertilizer/fertilizerIngredient";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";
import {translate} from "../../../helpers/translate/translate";
import {Fertilizer} from "../../../models/fertilizer/fertilizer";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = ({editableFertilizer, onSave, addElement, chemicalComplexes}) => {
    const [name, setName] = useState<string>('')
    const [ingredients, setIngredients] = useState<FertilizerIngredient[]>([])

    useEffect(() => {
        if (editableFertilizer) {
            setName(editableFertilizer.name)
            setIngredients(editableFertilizer.ingredients)
        }
    }, [editableFertilizer])

    const onChemicalChanged = (updatedIngredient: FertilizerIngredient) => {
        const updatedElements = ingredients.map(element => {
            if (element.id === updatedIngredient.id) {
                return updatedIngredient
            }
            return element
        })
        updateIngredients(updatedElements)
    }

    const onDeleteIngredient = (deletedIngredient: FertilizerIngredient) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== deletedIngredient.id)
        updateIngredients(updatedIngredients)
    }

    const updateIngredients = (updatedElements: FertilizerIngredient[]) => {
        setIngredients(updatedElements)
    }

    const onAddFertilizerNewElement = () => {
        updateIngredients([...ingredients, new FertilizerIngredient()])
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const save = () => {
        let fertilizer = new Fertilizer(name, ingredients)
        if (editableFertilizer) {
            fertilizer = new Fertilizer(name, ingredients, editableFertilizer.id)
        }
        onSave(fertilizer)
        resetState()
    }

    const resetState = () => {
        setIngredients([])
        setName('')
    }

    const renderElements = () => {
        return ingredients.map(element => <FertilizerElement
            key={element.id}
            ingredient={element}
            chemicalComplexList={chemicalComplexes}
            onChemicalChanged={onChemicalChanged}
            onDeleteIngredient={onDeleteIngredient}
        />)
    }

    return (
        <form className={style.fertilizerEditor}>
            <Input
                value={name}
                placeholder={translate('enterFertilizerName')}
                className={`${commonStyles.mb_micro}`}
                onChange={onChangeName}
            />
            <div className={`${commonStyles.mb_nano} ${commonStyles.title}`}>{translate('fertilizerComposition')}:</div>

            {renderElements()}

            <Button
                type={BUTTON_TYPE.PRIMARY}
                shape={BUTTON_SHAPE.CIRCLE}
                className={style.addButton}
                onClick={onAddFertilizerNewElement}
            >
                +
            </Button>
            <div className={style.footer}>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className={`${commonStyles.mb_nano}`}
                    onClick={save}
                >
                    {translate('save')}
                </Button>

                <Button
                    className={`${commonStyles.mb_nano}`}
                    onClick={addElement}
                >
                    {translate('compoundEditor')}
                </Button>
            </div>
        </form>
    );
};

export {FertilizerEditor}