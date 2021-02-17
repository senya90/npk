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
import {isExist, notEmptyArray} from "../../helpers/utils";
import { Gag } from 'molecule/gag/Gag';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";


const AgriculturesView: FunctionComponent<AgriculturesProps> =
    ({
         agricultures,
         activeAgriculture,
         onAgriculturesUpdated,
         onAgriculturesAdd,
         chemicals
    }) => {
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
            setEditableAgriculture(undefined)
            onAgriculturesUpdated([agriculture])
        }
        , [onAgriculturesUpdated]
    )

    const onAgricultureAdd = useCallback(
        (agriculture: Agriculture) => {
            setIsAddNew(false)
            onAgriculturesAdd([agriculture])
        }, [onAgriculturesAdd]
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

    const isEmptyAgricultureList = () => {
        return !agricultures || !notEmptyArray(agricultures)
    }

    return (
        <div className={style.agricultureWrapper}>
            <Title border>{translate('agriculture')}</Title>
            {isEmptyAgricultureList() &&
                <div className={style.gagWrapper}>
                    <Gag
                        icon={
                            <Icon type={ICON_TYPE.Agriculture} size={100}/>
                        }
                    >
                        {translate('addYourAgriculture')}
                    </Gag>
                </div>
            }
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
                className={style.addButton}
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
                    chemicals={chemicals}
                    agriculture={editableAgriculture}
                    onAgricultureChanged={onAgricultureChanged}
                    onAgricultureAdd={onAgricultureAdd}
                />
            </Modal>
            }
        </div>
    )
}

export {AgriculturesView}