import React, {FC, useContext, useState} from 'react';
import cn from "classnames";
import {Button} from "atom/button/Button";
import {BUTTON_SHAPE, BUTTON_TYPE} from "atom/button/ButtonTypes";
import {Icon} from "atom/icon/Icon";
import {ICON_TYPE} from "atom/icon/IconTypes";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {CalculatorContext} from "helpers/contexts/CalculatorContext";
import {ElementConstructorContext} from "helpers/contexts/ElementConstructorContext";
import { translate } from 'helpers/translate/translate';
import {Tooltip} from "atom/tooltip/Tooltip";

import style from './chemucalComplexView.module.scss'
import { Popover } from 'atom/popover/Popover';
import {DeleteComplexResponse} from "../../../models/_types/chemicalComplex";
import {FertilizersUsingComplexes} from "../../../models/_types/fertilizer";


interface ChemicalComplexViewProps {
    complex: ChemicalComplex
    userId: string | null
}

const ChemicalComplexView: FC<ChemicalComplexViewProps> = ({complex, userId}) => {
    const {onChemicalComplexRemoved} = useContext(CalculatorContext)
    const {onEditComplex, onConfirmComplexDeleting} = useContext(ElementConstructorContext)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    const isOwner = complex.userId === userId
    const complexStyle = cn(style.complexItem, {[style.complexItemNotOwner]: !isOwner})

    const showDeleteComplexModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowModal(true)
    }

    const closeModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowModal(false)
    }

    const onVisibleChange = (visible: boolean) => {
        setIsShowModal(visible)
    }

    const openConfirmDeletionModal = (fertilizerUsingComplexes: FertilizersUsingComplexes[]) => {
        onConfirmComplexDeleting(fertilizerUsingComplexes)
    }

    const removeComplex = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowModal(false)
        try {
            const response = await API.postAuthorized<DeleteComplexResponse>(ApiURL.deleteChemicalComplexes, {id: [complex.id]})
            const deleteComplex = response.data.data
            if (deleteComplex.needToConfirm) {
                openConfirmDeletionModal(deleteComplex.fertilizerUsingComplexes)
                return
            }

            if (!response.data.error) {
                onChemicalComplexRemoved([complex.id])
            }
        } catch (err) {
            console.error(`ChemicalComplexView#removeComplex`, err)
        }
    }

    const editComplex = () => {
        onEditComplex(complex)
    }

    const renderComplex = () => {
        return (
            <div className={complexStyle} onClick={editComplex}>
                <span>{complex.name}</span>
                {isOwner &&
                    <Popover
                        visible={isShowModal}
                        title={`${translate('deleteChemicalCompound')} - ${complex.name} ?`}
                        onVisibleChange={onVisibleChange}
                        content={
                            <div className={style.modalButtonsBox}>
                                <Button
                                    className={style.modalButton}
                                    onClick={closeModal}
                                >
                                    {translate('cancel')}
                                </Button>
                                <Button
                                    className={style.modalButton}
                                    danger
                                    type={BUTTON_TYPE.PRIMARY}
                                    onClick={removeComplex}
                                >
                                    {translate('delete')}
                                </Button>
                            </div>
                        }
                    >
                        <Button
                            className={style.complexItemDelete}
                            shape={BUTTON_SHAPE.CIRCLE}
                            onClick={showDeleteComplexModal}
                        >
                            <Icon type={ICON_TYPE.Cross} size={8}/>
                        </Button>
                    </Popover>

                }

            </div>
        )
    }

    return (
        <>
            {isOwner ?
                renderComplex()
                :
                <Tooltip
                    title={`${complex.name} (${translate('admin')})`}
                >
                    {renderComplex()}
                </Tooltip>

            }

        </>

    );
};

export default ChemicalComplexView;