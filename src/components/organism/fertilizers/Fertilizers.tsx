import React, {FunctionComponent, useCallback, useContext, useState} from 'react';
import cn from 'classnames'

import {BUTTON_TYPE} from "components/atom/button/ButtonTypes";
import {Button} from "components/atom/button/Button";
import {translate} from "helpers/translate/translate";
import {Title} from 'components/atom/title/Title';
import {FertilizersProps} from "./FertilizersTypes";
import {FertilizerView} from "../fertilizerView/FertilizerView";
import Modal from 'components/organism/modal/Modal';
import {FertilizerEditor} from "../fertilizerEditor/FertilizerEditor";
import {Fertilizer} from "models/fertilizer/fertilizer";
import {CalculatorContext, CalculatorContextType} from "helpers/contexts/CalculatorContext";
import { Dosage } from 'models/dosage/dosage';

import style from './fertilizers.module.scss'
import {notEmptyArray} from "helpers/utils";
import { Gag } from 'components/molecule/gag/Gag';
import { ICON_TYPE } from 'components/atom/icon/IconTypes';
import { Icon } from 'components/atom/icon/Icon';
import { ElementConstructor } from 'components/organism/elementConstructor/ElementConstructor';
import { DeleteFertilizerModal } from './deleteFertilizerModal/DeleteFertilizerModal';
import {DeleteFertilizerResponse} from "../../../models/_types/fertilizer";
import {API} from "../../../core/api";
import {ApiURL} from "../../../core/api/ApiURL";
import {SolutionsUsingFertilizer} from "../../../models/solution/solution";


const Fertilizers:FunctionComponent<FertilizersProps> = ({
    fertilizers,
    editableFertilizer,
    solution,
    chemicalComplexes,
    className
}) => {
    const {onSaveFertilizer, onEditFertilizer, onDeleteFertilizer} = useContext<CalculatorContextType>(CalculatorContext)
    const [solutionUsingFertilizer, setSolutionUsingFertilizer] = useState<SolutionsUsingFertilizer[] | undefined>()
    const [isShowFertilizerEditor, setIsShowFertilizerEditor] = useState(false)
    const [isShowElementConstructor, setIsShowElementConstructor] = useState(false)

    const renderFertilizers = () => {
        return fertilizers.map(fertilizer => {
            let fertilizerUsedNow: Dosage | undefined = undefined
            if (solution) {
                fertilizerUsedNow = solution.dosages.find(dosage => dosage.fertilizer.id === fertilizer.id)
            }

            return (
                <FertilizerView
                    key={fertilizer.id}
                    fertilizer={fertilizer}
                    editFertilizer={editFertilizer}
                    isShowAdd={!fertilizerUsedNow}
                    onDeleteFertilizer={deleteFertilizer}
                />
            )
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
        onEditFertilizer(undefined)
    }

    const closeElementConstructor = () => {
        setIsShowElementConstructor(false)
    }

    const onSave = async (fertilizer: Fertilizer) => {
        try {
            await onSaveFertilizer(fertilizer)
            closeFertilizerEditor()
        } catch (err) {
            throw err
        }
    }

    const closeConfirmationModal = () => {
        setSolutionUsingFertilizer(undefined)
    }

    const deleteFertilizer = async (fertilizerId: string, isConfirmed = false) => {
        try {
            const response = await API.postAuthorized<DeleteFertilizerResponse>(ApiURL.deleteFertilizer, {id: [fertilizerId], isConfirmed})

            const solutions = response.data.data.solutionsUsingFertilizers
            if (response.data.data.needToConfirm) {
                setSolutionUsingFertilizer(solutions)
                return
            }

            setSolutionUsingFertilizer(undefined)
            onDeleteFertilizer(fertilizerId, notEmptyArray(solutions))

        } catch (err) {
            throw err
        }
    }

    const wrapperStyles = cn(
        className,
        style.fertilizersWrapper,
    )

    return (
        <div className={wrapperStyles}>
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
                className={style.addButton}
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
                        chemicalComplexes={chemicalComplexes}
                    />
                </Modal>
            }

            {isShowElementConstructor &&
            <Modal
                title={translate('compoundConstructor')}
                onClose={closeElementConstructor}
            >
                <ElementConstructor chemicalComplexes={chemicalComplexes}/>
            </Modal>
            }
            {solutionUsingFertilizer &&
                <Modal
                    title={`${translate('attention')}!`}
                    onClose={closeConfirmationModal}
                >
                    <DeleteFertilizerModal
                        closeModal={closeConfirmationModal}
                        onDeleteFertilizer={deleteFertilizer}
                        solutionUsingFertilizers={solutionUsingFertilizer}
                    />
                </Modal>
            }

        </div>
    )
}

export {Fertilizers}