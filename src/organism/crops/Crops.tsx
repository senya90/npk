import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from 'helpers/translate/translate';
import {CropsProps} from "./CropsTypes";

import style from './crops.module.scss'
import {CropsItem} from "./cropsItem/CropsItem";
import {Crop} from 'models/crop';


const Crops: FunctionComponent<CropsProps> = (props) => {

    const isActive = (crop: Crop) => {
        return crop.id === props.activeCrop.id
    }

    return (
        <div className={style.cropsWrapper}>
            <Title>{translate('crops')}</Title>
            {
                props.crops.map(crop => (
                    <CropsItem
                        crop={crop}
                        key={crop.id}
                        isActive={isActive(crop)}
                    />
                ))
            }
        </div>
    );
};

export {Crops}