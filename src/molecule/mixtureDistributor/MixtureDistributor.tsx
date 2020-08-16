import React, {FunctionComponent} from 'react';
import {MixtureDistributorProps} from "./MixtureDistributorTypes";

import style from './mixtureDistributor.module.scss'


const MixtureDistributor: FunctionComponent<MixtureDistributorProps> = (props) => {
    const {volume, percent = 100} = props

    return (
        <div
            className={style.mixtureDistributor}
            {...props}
        >
            MixtureLiterCtrl
            {volume}
            {percent}
        </div>
    );
};

export {MixtureDistributor}