import React, {FC, useContext, useState} from 'react';
import {Button} from "atom/button/Button";
import {BUTTON_SHAPE, BUTTON_TYPE} from "atom/button/ButtonTypes";
import {Icon} from "atom/icon/Icon";
import {ICON_TYPE} from "atom/icon/IconTypes";
import cn from "classnames";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";

import style from './chemucalComplexView.module.scss'
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {CalculatorContext} from "helpers/contexts/CalculatorContext";
import {ElementConstructorContext} from "helpers/contexts/ElementConstructorContext";
import Modal from 'organism/modal/Modal';
import { translate } from 'helpers/translate/translate';

interface ChemicalComplexViewProps {
    complex: ChemicalComplex
    userId: string | null
}

const ChemicalComplexView: FC<ChemicalComplexViewProps> = ({complex, userId}) => {
    const {onChemicalComplexRemoved} = useContext(CalculatorContext)
    const {onEditComplex} = useContext(ElementConstructorContext)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    const isOwner = complex.userId === userId
    const complexStyle = cn(style.complexItem, {[style.complexItemNotOwner]: !isOwner})

    const showDeleteComplexModal = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsShowModal(true)
    }

    const closeModal = () => {
        setIsShowModal(false)
    }

    const removeComplex = async () => {
        setIsShowModal(false)
        const response = await API.postAuthorized(ApiURL.deleteChemicalComplexes, {id: [complex.id]})
        if (!response.data.error) {
            onChemicalComplexRemoved([complex.id])
        }
    }

    const editComplex = () => {
        onEditComplex(complex)
    }

    return (
        <>
            {isShowModal &&
                <Modal
                    onClose={closeModal}
                    title={`${translate('deleteChemicalCompound')} - ${complex.name} ?`}
                >
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
                </Modal>
            }
            <div className={complexStyle} onClick={editComplex}>
                <span>{complex.name}</span>
                {isOwner &&
                <Button
                    className={style.complexItemDelete}
                    shape={BUTTON_SHAPE.CIRCLE}
                    onClick={showDeleteComplexModal}
                >
                    <Icon type={ICON_TYPE.Cross} size={8}/>
                </Button>
                }

            </div>
        </>

    );
};

export default ChemicalComplexView;