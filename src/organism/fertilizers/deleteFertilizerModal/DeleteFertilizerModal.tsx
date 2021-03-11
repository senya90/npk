import React, {FC} from 'react';
import { SolutionsUsingFertilizer } from 'models/solution/solution';


interface DeleteFertilizerModalProps {
    solutionUsingFertilizers: SolutionsUsingFertilizer[]
    closeModal: () => void
    onDeleteFertilizer: (fertilizerId: string, isConfirmed: boolean) => void
}

const DeleteFertilizerModal: FC<DeleteFertilizerModalProps> = ({solutionUsingFertilizers, closeModal, onDeleteFertilizer}) => {
    return (
        <div>
            {solutionUsingFertilizers.map(sol => {
                return <div>{sol.fertilizer.name}</div>
            })}

        </div>
    );
};

export {DeleteFertilizerModal}