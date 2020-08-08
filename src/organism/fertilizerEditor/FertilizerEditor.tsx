import React, {FunctionComponent, useState} from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';
import { elementMock } from 'mocks/elementMock';

import style from './fertilizerEditor.module.scss'
import {commonStyles} from "../../helpers/commonStyle";
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {FertilizerEditorElement} from "../../models/fertilizerEditorElement";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";
import {translate} from "../../helpers/translate/translate";
import {Fertilizer} from "../../models/fertilizer";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = (props) => {
    const [name, setName] = useState<string>('')
    const [elements, setElements] = useState<FertilizerEditorElement[]>([])

    const onElementChanged = (updatedElement: FertilizerEditorElement) => {
        const updatedElements = elements.map(element => {
            if (element.id === updatedElement.id) {
                return updatedElement
            }
            return element
        })
        updateElements(updatedElements)
    }

    const renderElements = () => {
        return elements.map(element => <FertilizerElement
            key={element.id}
            element={element}
            elementsList={elementMock}
            onElementChanged={onElementChanged}
        />)
    }

    const updateElements = (updatedElements: FertilizerEditorElement[]) => {
        console.log('updatedElements', updatedElements)
        setElements(updatedElements)
    }

    const onAddFertilizerNewElement = (e: React.MouseEvent) => {
        updateElements([...elements, new FertilizerEditorElement()])
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSave = () => {
        const fertilizer = new Fertilizer(name, elements)
        props.onSaveFertilizer(fertilizer)
        resetState()
    }

    const resetState = () => {
        setElements([])
        setName('')
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