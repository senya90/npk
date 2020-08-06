import React from 'react';
import {Button} from "../../atom/button/Button";
import {BUTTON_SHAPE, BUTTON_TYPE} from "../../atom/button/ButtonTypes";

const FertilizerEditor = () => {
    return (
        <form>
            <input type="text" placeholder={'Введите название удобрения'}/>
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