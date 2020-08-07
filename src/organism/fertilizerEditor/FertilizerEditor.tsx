import React from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';
import { Select } from 'atom/select/Select';
import { elementMock } from 'mocks/elementMock';
import { SelectOption } from 'atom/select/SelectTypes';

import style from './fertilizerEditor.module.css'
import {AdapterFertilizer} from "../../helpers/adapterFertilizer/AdapterFertilizer";

const FertilizerEditor = () => {

    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.toSelect(elements)
    }

    return (
        <form>
            <Input placeholder={'Введите название удобрения'}/>
            <div>Состав удобрения:</div>

            <Select
                default={'Выберите элемент'}
                options={adaptForSelect(elementMock)}
                containerClass={style.element}
            />

            <Button
                type={BUTTON_TYPE.PRIMARY}
                shape={BUTTON_SHAPE.CIRCLE}
            >
                +
            </Button>
            <Button
                type={BUTTON_TYPE.PRIMARY}
            >
                Сохранить
            </Button>

        </form>
    );
};

export {FertilizerEditor}