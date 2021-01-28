import React, {FunctionComponent, useCallback, useContext, useState} from 'react';

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
import { ICON_TYPE } from 'atom/icon/IconTypes';
import { Icon } from 'atom/icon/Icon';
import { ElementConstructor } from 'organism/elementConstructor/ElementConstructor';


const Fertilizers:FunctionComponent<FertilizersProps> = ({fertilizers, editableFertilizer, mixture}) => {
    const {onSaveFertilizer, onEditFertilizer} = useContext<CalculatorContextType>(CalculatorContext)
    const [isShowFertilizerEditor, setIsShowFertilizerEditor] = useState(false)
    const [isShowElementConstructor, setIsShowElementConstructor] = useState(false)

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
        setIsShowFertilizerEditor(true)
    }

    const addElement = useCallback(() => {
        setIsShowElementConstructor(true)
    }, [])

    const editFertilizer = (fertilizer: Fertilizer) => {
        onEditFertilizer(fertilizer.id)
        setIsShowFertilizerEditor(true)
    }

    const closeFertilizerEditor = () => {
        setIsShowFertilizerEditor(false)
    }

    const closeElementConstructor = () => {
        setIsShowElementConstructor(false)
    }

    const onSave = (fertilizer: Fertilizer) => {
        closeFertilizerEditor()
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
                <div className={style.emptyWrapper}>
                    <Gag
                        icon={
                            <Icon type={ICON_TYPE.Fertilizer} size={100}/>
                        }
                    >
                        {translate('addYourFertilizers')}
                    </Gag>
                </div>
            }

            <Button
                type={BUTTON_TYPE.PRIMARY}
                onClick={addEditFertilizer}
                containerclass={style.addButton}
            >
                {translate('addFertilizer')}
            </Button>

            {isShowFertilizerEditor &&
                <Modal
                    title={translate('fertilizer')}
                    onClose={closeFertilizerEditor}
                >
                    <FertilizerEditor
                        editableFertilizer={editableFertilizer}
                        onSave={onSave}
                        addElement={addElement}
                    />
                </Modal>
            }

            {isShowElementConstructor &&
            <Modal
                title={translate('elementConstructor')}
                onClose={closeElementConstructor}
            >
                <ElementConstructor/>
            </Modal>
            }

        </div>
    )
}

export {Fertilizers}