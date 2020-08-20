import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import { translate } from 'helpers/translate/translate';
import {CropsProps} from "./CropsTypes";

const Crops: FunctionComponent<CropsProps> = (props) => {
    return (
        <div>
            <Title>{translate('crops')}</Title>
            {
                props.crops.map(crop => <div>{crop.name}</div>)
            }
        </div>
    );
};

export {Crops}