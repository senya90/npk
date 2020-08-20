import React, {FunctionComponent, useContext} from 'react';
import Title from 'atom/title/Title';
import { translate } from 'helpers/translate/translate';
import {CropsProps} from "./CropsTypes";

import style from './crops.module.scss'
import {CropsItem} from "./cropsItem/CropsItem";


const Crops: FunctionComponent<CropsProps> = (props) => {

    return (
        <div className={style.cropsWrapper}>
            <Title>{translate('crops')}</Title>
            {
                props.crops.map(crop => <CropsItem crop={crop} key={crop.id}/>)
            }
        </div>
    );
};

export {Crops}