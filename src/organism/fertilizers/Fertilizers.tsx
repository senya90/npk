import React, {FunctionComponent, useContext, useState} from 'react';

import {BUTTON_TYPE} from "atom/button/ButtonTypes";
import {Button} from "atom/button/Button";
import {translate} from "helpers/translate/translate";
import Title from 'atom/title/Title';
import {FertilizersProps} from "./FertilizersTypes";
import {FertilizerView} from "../fertilizerView/FertilizerView";
import Modal from 'organism/modal/Modal';
import {FertilizerEditor} from "../fertilizerEditor/FertilizerEditor";
import {Fertilizer} from "models/fertilizer";
import {CalculatorContext, CalculatorContextType} from "helpers/contexts/CalculatorContext";
import { Dosage } from 'models/dosage';

import style from './fertilizers.module.scss'
import {notEmptyArray} from "../../helpers/utils";
import { Gag } from 'molecule/gag/Gag';


const Fertilizers:FunctionComponent<FertilizersProps> = ({fertilizers, editableFertilizer, mixture}) => {
    const {onSaveFertilizer, onEditFertilizer} = useContext<CalculatorContextType>(CalculatorContext)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const renderFertilizers = () => {
        return fertilizers.map(fertilizer => {
            let fertilizerUsedNow: Dosage | undefined = undefined
            if (mixture) {
                fertilizerUsedNow = mixture.dosages.find(dosage => dosage.fertilizer.id === fertilizer.id)
            }

            return <FertilizerView key={fertilizer.id} fertilizer={fertilizer} editFertilizer={editFertilizer} isShowAdd={!fertilizerUsedNow}/>
        })
    }

    const addEditFertilizer = () => {
        setIsOpenModal(true)
    }

    const editFertilizer = (fertilizer: Fertilizer) => {
        onEditFertilizer(fertilizer.id)
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const onSave = (fertilizer: Fertilizer) => {
        closeModal()
        onSaveFertilizer(fertilizer)
    }

    return (
        <div className={style.fertilizers_wrapper}>
            <Title border>{translate('fertilizers')}</Title>
            {notEmptyArray(fertilizers) ?
                <div className={style.fertilizersBox}>
                    {renderFertilizers()}
                </div>
                :
                <Gag>
                    {translate('addYourFertilizers')}
                </Gag>
            }

            <Button
                type={BUTTON_TYPE.PRIMARY}
                onClick={addEditFertilizer}
            >
                {translate('addFertilizer')}
            </Button>

            {isOpenModal &&
                <Modal
                    title={translate('fertilizer')}
                    onClose={closeModal}
                >
                    <FertilizerEditor
                        editableFertilizer={editableFertilizer}
                        onSave={onSave}
                    />
                </Modal>
            }

        </div>
    )
}

export {Fertilizers}