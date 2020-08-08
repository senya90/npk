import React, {FunctionComponent, useState} from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';
import { elementMock } from 'mocks/elementMock';

import style from './fertilizerEditor.module.css'
import {commonStyles} from "../../helpers/commonStyle";
import { InputTypeValue } from 'atom/inputNumber/InputNumberTypes';
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {FertilizerEditorElement} from "../../models/fertilizerEditorElement";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";
import {translate} from "../../helpers/translate/translate";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = (props) => {
    const [elements, setElements] = useState<FertilizerEditorElement[]>([])

    const onElementChanged = (e: InputTypeValue) => {
        console.log('change', e)
    }

    const renderElements = () => {
        return elements.map(element => <FertilizerElement
            key={element.id}
            element={element}
            elementsList={elementMock}
            onElementChanged={onElementChanged}
        />)
    }

    const onAddFertilizerNewElement = (e: React.MouseEvent) => {
        updateElements([...elements, new FertilizerEditorElement()])
    }

    const updateElements = (updatedElements: FertilizerEditorElement[]) => {
        setElements(updatedElements)
        // this.onFertilizerElementsUpdated() // notify
    }

    return (
        <form className={style.fertilizerEditor}>
            <Input
                placeholder={translate('enterFertilizerName')}
                className={`${commonStyles.mb_micro}`}
            />
            <div>{translate('fertilizerComposition')}:</div>

            {renderElements()}

            <Button
                type={BUTTON_TYPE.PRIMARY}
                shape={BUTTON_SHAPE.CIRCLE}
                containerclass={`${commonStyles.mb_micro} ${commonStyles.db}`}
                onClick={onAddFertilizerNewElement}
            >
                +
            </Button>
            <Button
                type={BUTTON_TYPE.PRIMARY}
                containerclass={`${commonStyles.mb_nano}`}
            >
                {translate('save')}
            </Button>

        </form>
    );
};

export {FertilizerEditor}