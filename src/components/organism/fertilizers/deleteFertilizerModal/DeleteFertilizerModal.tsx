import React, {FC} from 'react';
import {SolutionDTO, SolutionsUsingFertilizer} from 'models/solution/solution';
import {translate} from "../../../../helpers/translate/translate";
import {Button} from "../../../atom/button/Button";
import {BUTTON_TYPE} from "../../../atom/button/ButtonTypes";
import {FertilizerDTO} from "../../../../models/_types/fertilizer";

import style from './deleteFertilizerModal.module.scss'


interface DeleteFertilizerModalProps {
    solutionUsingFertilizers: SolutionsUsingFertilizer[]
    closeModal: () => void
    onDeleteFertilizer: (fertilizerId: string, isConfirmed: boolean) => void
}


// TODO: full copy <DeleteComplexModal/>
// TODO: REMOVE DUPLICATES
const DeleteFertilizerModal: FC<DeleteFertilizerModalProps> = ({solutionUsingFertilizers, closeModal, onDeleteFertilizer}) => {

    const deleteFertilizer = (fertilizer: FertilizerDTO) => {
        onDeleteFertilizer(fertilizer.id, true)
    }

    const cancel = () => {
        closeModal()
    }

    const renderSolutions = (solutions: SolutionDTO[]) => {
        return solutions.map((solution, index) => {
            const isLastItem = solutions.length - 1 === index
            return (
                <b key={solution.id}>
                    {solution.name}
                    {!isLastItem &&
                    <>, </>
                    }
                </b>
            )
        })
    }

    const renderWarnings = () => {
        return solutionUsingFertilizers.map(({solutions, fertilizer}) => {
            return (
                <div key={fertilizer.id}>
                    <div className={style.message}>
                        {translate('fertilizer')} <b>{fertilizer.name}</b> {translate('usingInSolutions')}: <span>{renderSolutions(solutions)}</span>
                    </div>
                    <div>
                        <Button
                            onClick={cancel}
                            className={style.formButton}
                            type={BUTTON_TYPE.PRIMARY}
                        >
                            {translate('cancel')}
                        </Button>
                        <Button
                            danger
                            type={BUTTON_TYPE.PRIMARY}
                            onClick={deleteFertilizer.bind(null, fertilizer)}
                            className={style.formButton}
                        >
                            {translate('deleteFertilizerFromLibraryFertilizers')}
                        </Button>

                    </div>
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

export {DeleteFertilizerModal}