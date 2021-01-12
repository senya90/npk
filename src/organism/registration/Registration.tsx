import React from 'react';
import {translate} from "helpers/translate/translate";
import Title from "atom/title/Title";

const Registration = () => {
    return (
        <div>
            <Title bottomMargin={"little"}>{translate('registration')}</Title>
        </div>
    );
};

export {Registration}