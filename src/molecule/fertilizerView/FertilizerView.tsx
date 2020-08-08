import React, {FunctionComponent} from 'react';
import {Fertilizer} from "../../models/fertilizer";
import {IngredientsView} from "../ingredientsView/IngredientsView";

interface FertilizerViewProps {
    fertilizer: Fertilizer
}

const FertilizerView: FunctionComponent<FertilizerViewProps> = ({fertilizer}) => {
    return (
        <div>
            {fertilizer.name}
            <IngredientsView composition={fertilizer.composition} />
        </div>
    );
};

export {FertilizerView}