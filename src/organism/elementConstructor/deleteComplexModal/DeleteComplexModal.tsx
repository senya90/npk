import React, {FC} from 'react';
import {FertilizerDTO, FertilizersUsingComplexes} from "../../../models/_types/fertilizer";
import {translate} from "../../../helpers/translate/translate";
import { Button } from 'atom/button/Button';

import style from './deleteComplexModal.module.scss'
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import {ChemicalComplex} from "../../../models/chemicalComplex/chemicalComplex";
import { ChemicalComplexDTO } from 'models/_types/chemicalComplex';

interface DeleteComplexModalProps {
    fertilizersUsingComplexes: FertilizersUsingComplexes[]
    closeModal: () => void
    onRemoveComplex: (chemicalComplex: ChemicalComplex | ChemicalComplexDTO, isConfirmed: boolean) => void
}

const DeleteComplexModal: FC<DeleteComplexModalProps> = ({fertilizersUsingComplexes, closeModal, onRemoveComplex}) => {

    const deleteComplex = (complex: ChemicalComplexDTO) => {
        onRemoveComplex(complex, true)
    }

    const cancel = () => {
        closeModal()
    }

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
                    <div className={style.message}>
                        {translate('compound')} <b>{chemicalComplex.name}</b> {translate('usingInFertilizers')}: <span>{renderFertilizers(fertilizers)}</span>
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
                            onClick={deleteComplex.bind(null, chemicalComplex)}
                            className={style.formButton}
                        >
                            {translate('deleteCompoundFromLibraryFertilizers')}
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

export {DeleteComplexModal}