import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import { translate } from 'helpers/translate/translate';
import {CropsProps} from "./CropsTypes";

import style from './crops.module.scss'


const Crops: FunctionComponent<CropsProps> = (props) => {
    return (
        <div className={style.cropsWrapper}>
            <Title>{translate('crops')}</Title>
            {
                props.crops.map(crop => <div>{crop.name}</div>)
            }
        </div>
    );
};

export {Crops}