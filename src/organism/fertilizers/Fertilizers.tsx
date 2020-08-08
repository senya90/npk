import React, {FunctionComponent} from 'react';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import {translate} from "../../helpers/translate/translate";
import Title from 'atom/title/Title';
import {FertilizersProps} from "./FertilizersType";

const Fertilizers:FunctionComponent<FertilizersProps> = ({fertilizers}) => {

    const renderFertilizers = () => {
        return fertilizers.map(fert => {
            return <div>{fert.id} {fert.name}</div>
        })
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