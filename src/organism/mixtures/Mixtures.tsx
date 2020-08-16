import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import { MixturesProps } from './MixturesTypes';
import {MixtureView} from "../../molecule/mixtureView/MixtureView";

import style from './mixture.module.scss'


const Mixtures: FunctionComponent<MixturesProps> = ({mixtures}) => {

    const renderMixtures = () => {
        return mixtures.map(mixture => <MixtureView key={mixture.id} mixture={mixture}/>)
    }

    console.log('mixtures', mixtures)

    return (
        <div>
            <Title>{translate('mixtures')}</Title>
            <div className={style.mixturesBox}>
                {renderMixtures()}
            </div>
        </div>

    );
};

export {Mixtures}