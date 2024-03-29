import React, {FC, useContext, useState} from 'react';
import cn from "classnames";
import {Button} from "components/atom/button/Button";
import {BUTTON_SHAPE, BUTTON_TYPE} from "components/atom/button/ButtonTypes";
import {Icon} from "components/atom/icon/Icon";
import {ICON_TYPE} from "components/atom/icon/IconTypes";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import {ElementConstructorContext} from "helpers/contexts/ElementConstructorContext";
import { translate } from 'helpers/translate/translate';
import {Tooltip} from "components/atom/tooltip/Tooltip";

import style from './chemucalComplexView.module.scss'
import stylePopover from 'components/atom/popover/popover.module.scss'
import { Popover } from 'components/atom/popover/Popover';


interface ChemicalComplexViewProps {
    complex: ChemicalComplex
    userId: string | null
}

const ChemicalComplexView: FC<ChemicalComplexViewProps> = ({complex, userId}) => {
    const {onEditComplex, onRemoveComplex} = useContext(ElementConstructorContext)
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

    const removeComplex = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowModal(false)
        onRemoveComplex(complex)
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
                            <div className={stylePopover.modalButtonsBox}>
                                <Button
                                    className={stylePopover.modalButton}
                                    onClick={closeModal}
                                >
                                    {translate('cancel')}
                                </Button>
                                <Button
                                    className={stylePopover.modalButton}
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