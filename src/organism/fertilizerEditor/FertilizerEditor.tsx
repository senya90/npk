import React from 'react';
import { Button } from 'atom/button/Button';
import { BUTTON_TYPE, BUTTON_SHAPE } from 'atom/button/ButtonTypes';
import { Input } from 'atom/input/Input';

const FertilizerEditor = () => {
    return (
        <form>
            <Input placeholder={'Введите название удобрения'}/>
            <div>Состав удобрения:</div>
            <div>
                блок с элементом, его значением и кнопкой удалить
            </div>
            <div>
                блок с элементом, его значением и кнопкой удалить
            </div>
            <div>
                блок с элементом, его значением и кнопкой удалить
            </div>
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