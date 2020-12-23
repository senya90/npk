import React, {FunctionComponent, useCallback, useState} from 'react';
import Title from 'atom/title/Title';
import {translate} from 'helpers/translate/translate';
import {AgriculturesProps} from "./AgricultureTypes";

import style from './agriculture.module.scss'
import {AgricultureItem} from "./agricultureItem/AgricultureItem";
import {Agriculture} from 'models/agriculture';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import Modal from 'organism/modal/Modal';
import {AgricultureEditor} from 'organism/agricultureEditor/AgricultureEditor';
import {isExist} from "../../helpers/utils";


const AgriculturesView: FunctionComponent<AgriculturesProps> = ({agricultures, activeAgriculture, onAgriculturesUpdated}) => {
    const [isAddNew, setIsAddNew] = useState(false)
    const [editableAgriculture, setEditableAgriculture] = useState<Agriculture | undefined>(undefined)

    const onEdit = useCallback(
        (agriculture: Agriculture) => {
            setEditableAgriculture(agriculture)
        }
        , []
    )

    const onAgricultureChanged = useCallback(
        (agriculture: Agriculture) => {
            setEditableAgriculture(agriculture)
            onAgriculturesUpdated([agriculture])
        }
        , [onAgriculturesUpdated]
    )

    const isActive = (agriculture: Agriculture) => {
        return agriculture.id === activeAgriculture.id
    }

    const openEditor = () => {
        setIsAddNew(true)
    }

    const closeEditor = () => {
        setIsAddNew(false)
        setEditableAgriculture(undefined)
    }

    const isOpenAddEditModal = () => {
        return isAddNew || isExist(editableAgriculture)
    }

    const getTitle = (): string => {
        if (isAddNew) {
            return translate('addAgriculture')
        }

        if (editableAgriculture) {
            return translate('editAgriculture')
        }

        return ''
    }

    return (
        <div className={style.agricultureWrapper}>
            <Title>{translate('agriculture')}</Title>
            {
                agricultures.map(agriculture => (
                    <AgricultureItem
                        agriculture={agriculture}
                        key={agriculture.id}
                        isActive={isActive(agriculture)}
                        onEdit={onEdit}
                    />
                ))
            }
            <Button
                onClick={openEditor}
                containerclass={style.addButton}
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addAgriculture')}
            </Button>
            {isOpenAddEditModal() &&
            <Modal
                onClose={closeEditor}
                title={getTitle()}
            >
                <AgricultureEditor
                    agriculture={editableAgriculture}
                    onAgricultureChanged={onAgricultureChanged}
                />
            </Modal>
            }
        </div>
    )
}

export {AgriculturesView}