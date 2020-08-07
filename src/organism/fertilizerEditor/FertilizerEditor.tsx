import React from 'react';
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

const FertilizerEditor = () => {

    const adaptForSelect = (elements: any[]): SelectOption[] => {
        return AdapterFertilizer.toSelect(elements)
    }

    const onElementChanged = (e: InputTypeValue) => {
        console.log('change', e)
    }

    return (
        <form className={style.fertilizerEditor}>
            <Input
                placeholder={'Введите название удобрения'}
                className={`${commonStyles.mb_micro}`}
            />
            <div>Состав удобрения:</div>

            <div className={style.elementsBox}>
                <div className={style.elementLine}>
                    <Select
                        default={translate('selectElement')}
                        options={adaptForSelect(elementMock)}
                        containerClass={style.element}
                    />
                    <InputNumber
                        defaultValue={0}
                        isPositive={true}
                        onChange={onElementChanged}
                    />
                </div>
            </div>

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