import React, {FunctionComponent, useState} from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';
import { Select } from 'atom/select/Select';
import { elementMock } from 'mocks/elementMock';
import { SelectOption } from 'atom/select/SelectTypes';

import {AdapterFertilizer} from "../../helpers/adapterFertilizer/AdapterFertilizer";
import { translate } from 'helpers/translate/translate';
import { InputNumber } from 'atom/inputNumber/InputNumber';
import style from './fertilizerEditor.module.css'
import {commonStyles} from "../../helpers/commonStyle";
import { InputTypeValue } from 'atom/inputNumber/InputNumberTypes';
import {FertilizerEditorProps} from "./FertilizerEditorTypes";
import {Element} from "../../models/element";
import {FertilizerElement} from "./fertilizerElement/FertilizerElement";

const FertilizerEditor: FunctionComponent<FertilizerEditorProps> = (props) => {
    const [elements, setElements] = useState<Element[]>([{id: '1232', name: 'dcssds', value: 123}])



    const onElementChanged = (e: InputTypeValue) => {
        console.log('change', e)
    }

    const renderElements = () => {
        return elements.map(element => <FertilizerElement
            key={element.name}
            element={element}
            elementsList={elementMock}
            onElementChanged={onElementChanged}
        />)
    }

    return (
        <form className={style.fertilizerEditor}>
            <Input
                placeholder={'Введите название удобрения'}
                className={`${commonStyles.mb_micro}`}
            />
            <div>Состав удобрения:</div>

            {renderElements()}

            <Button
                type={BUTTON_TYPE.PRIMARY}
                shape={BUTTON_SHAPE.CIRCLE}
                containerclass={`${commonStyles.mb_micro} ${commonStyles.db}`}
            >
                +
            </Button>
            <Button
                type={BUTTON_TYPE.PRIMARY}
                containerclass={`${commonStyles.mb_nano}`}
            >
                Сохранить
            </Button>

        </form>
    );
};

export {FertilizerEditor}