import React, {FunctionComponent, useEffect, useState} from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';

import style from './fertilizerEditor.module.scss'
import {commonStyles} from "../../helpers/commonStyle";
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {FertilizerIngredient} from "../../models/fertilizerIngredient";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";
import {translate} from "../../helpers/translate/translate";
import {Fertilizer} from "../../models/fertilizer";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = ({editableFertilizer, onSave, addElement, chemicalComplexes}) => {
    const [name, setName] = useState<string>('')
    const [elements, setElements] = useState<FertilizerIngredient[]>([])

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

    const onAddFertilizerNewElement = () => {
        updateElements([...elements, new FertilizerIngredient()])
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const save = () => {
        let fertilizer = new Fertilizer(name, elements)
        if (editableFertilizer) {
            fertilizer = new Fertilizer(name, elements, editableFertilizer.id)
        }
        onSave(fertilizer)
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
            chemicalComplexList={chemicalComplexes}
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
                    {translate('addElement')}
                </Button>
            </div>
        </form>
    );
};

export {FertilizerEditor}