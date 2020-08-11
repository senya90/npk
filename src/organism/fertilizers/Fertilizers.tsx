import React, {FunctionComponent} from 'react';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import {translate} from "../../helpers/translate/translate";
import Title from 'atom/title/Title';
import {FertilizersProps} from "./FertilizersTypes";
import {FertilizerView} from "../../molecule/fertilizerView/FertilizerView";

import style from './fertilizers.module.scss'


const Fertilizers:FunctionComponent<FertilizersProps> = ({fertilizers}) => {

    const renderFertilizers = () => {
        return fertilizers.map(fertilizer => <FertilizerView key={fertilizer.id} fertilizer={fertilizer}/>)
    }

    return (
        <div className={style.fertilizers_wrapper}>
            <Title>{translate('fertilizers')}</Title>
            <div className={style.fertilizersBox}>
                {renderFertilizers()}
            </div>
            <Button
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addFertilizer')}
            </Button>

        </div>
    );
};

export {Fertilizers}