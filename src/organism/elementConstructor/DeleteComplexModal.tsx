import React, {FC} from 'react';
import {FertilizerDTO, FertilizersUsingComplexes} from "../../models/_types/fertilizer";
import {translate} from "../../helpers/translate/translate";

interface DeleteComplexModalProps {
    fertilizersUsingComplexes: FertilizersUsingComplexes[]
}

const DeleteComplexModal: FC<DeleteComplexModalProps> = ({fertilizersUsingComplexes}) => {

    const renderFertilizers = (fertilizers: FertilizerDTO[]) => {
        return fertilizers.map((fertilizer, index) => {
            const isLastItem = fertilizers.length - 1 === index
            return (
                <b key={fertilizer.id}>
                    {fertilizer.name}
                    {!isLastItem &&
                        <>, </>
                    }
                </b>
            )
        })
    }

    const renderWarnings = () => {
        return fertilizersUsingComplexes.map(({fertilizers, chemicalComplex}) => {
            return (
                <div key={chemicalComplex.id}>
                    {translate('compound')} <b>{chemicalComplex.name}</b> {translate('usingInFertilizers')}: <span>{renderFertilizers(fertilizers)}</span>
                </div>
            )
        })
    }

    return (
        <div>
            {renderWarnings()}
        </div>
    );
};

export {DeleteComplexModal}