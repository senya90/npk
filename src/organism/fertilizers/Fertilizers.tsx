import React, {FunctionComponent} from 'react';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import {translate} from "../../helpers/translate/translate";
import Title from 'atom/title/Title';
import {FertilizersProps} from "./FertilizersType";
import {FertilizerView} from "../../molecule/fertilizerView/FertilizerView";

const Fertilizers:FunctionComponent<FertilizersProps> = ({fertilizers}) => {

    const renderFertilizers = () => {
        return fertilizers.map(fertilizer => <FertilizerView key={fertilizer.id} fertilizer={fertilizer}/>)
    }

    return (
        <div>
            <Title>Удобрения</Title>
            {renderFertilizers()}
            <Button
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addFertilizer')}
            </Button>

        </div>
    );
};

export {Fertilizers}