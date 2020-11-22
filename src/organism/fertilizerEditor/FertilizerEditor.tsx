import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';
import { chemicalComplexMockArray } from 'mocks/chemicalComplexMock';

import style from './fertilizerEditor.module.scss'
import {commonStyles} from "../../helpers/commonStyle";
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {FertilizerIngredient} from "../../models/fertilizerIngredient";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";
import {translate} from "../../helpers/translate/translate";
import {Fertilizer} from "../../models/fertilizer";
import {CalculatorContext, CalculatorContextType} from "../../helpers/contexts/CalculatorContext";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = ({editableFertilizer}) => {
    const [name, setName] = useState<string>('')
    const [elements, setElements] = useState<FertilizerIngredient[]>([])
    const {onSaveFertilizer} = useContext<CalculatorContextType>(CalculatorContext)

    useEffect(() => {
        if (editableFertilizer) {
            setName(editableFertilizer.name)
            setElements(editableFertilizer.ingredients)
        }
    }, [editableFertilizer])

    const onElementChanged = (updatedElement: FertilizerIngredient) => {
        const updatedElements = elements.map(element => {
            if (element.id === updatedElement.id) {
                return updatedElement
            }
            return element
        })
        updateElements(updatedElements)
    }

    const updateElements = (updatedElements: FertilizerIngredient[]) => {
        setElements(updatedElements)
    }

    const onAddFertilizerNewElement = (e: React.MouseEvent) => {
        updateElements([...elements, new FertilizerIngredient()])
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSave = () => {
        let fertilizer = new Fertilizer(name, elements)
        if (editableFertilizer) {
            fertilizer = new Fertilizer(name, elements, editableFertilizer.id)
        }
        onSaveFertilizer(fertilizer)
        resetState()
    }

    const resetState = () => {
        setElements([])
        setName('')
    }

    const renderElements = () => {
        return elements.map(element => <FertilizerElement
            key={element.id}
            chemical={element}
            chemicalList={chemicalComplexMockArray()}
            onChemicalChanged={onElementChanged}
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
                containerclass={style.addButton}
                onClick={onAddFertilizerNewElement}
            >
                +
            </Button>
            <Button
                type={BUTTON_TYPE.PRIMARY}
                containerclass={`${commonStyles.mb_nano}`}
                onClick={onSave}
            >
                {translate('save')}
            </Button>

        </form>
    );
};

export {FertilizerEditor}