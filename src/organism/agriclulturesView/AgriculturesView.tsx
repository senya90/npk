import React, {FunctionComponent, useCallback, useContext, useState} from 'react';
import {Title} from 'atom/title/Title';
import {translate} from 'helpers/translate/translate';
import {AgriculturesProps} from "./AgricultureTypes";

import style from './agriculture.module.scss'
import {AgricultureItem} from "./agricultureItem/AgricultureItem";
import {Agriculture, AgricultureDTO} from 'models/agriculture';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import Modal from 'organism/modal/Modal';
import {AgricultureEditor} from 'organism/agricultureEditor/AgricultureEditor';
import {isExist, notEmptyArray} from "helpers/utils";
import { Gag } from 'molecule/gag/Gag';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {API} from "../../core/api";
import {ApiURL} from "../../core/api/ApiURL";
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";


const AgriculturesView: FunctionComponent<AgriculturesProps> =
    ({
         agricultures,
         activeAgriculture,
         onAgriculturesAdd,
         chemicals
    }) => {
    const {onDeleteAgricultures, onUpdateAgricultures} = useContext(CalculatorContext)
    const [isAddNew, setIsAddNew] = useState(false)
    const [editableAgriculture, setEditableAgriculture] = useState<Agriculture | undefined>(undefined)

    const onEdit = useCallback((agriculture: Agriculture) => {
        setEditableAgriculture(agriculture)
    }, [])

    const onDelete = useCallback(async (agriculture: Agriculture) => {
        const response = await API.postAuthorized<string[]>(ApiURL.deleteAgriculture, {ids: [agriculture.id]})

        if (!response.data.error) {
            const deletedAgriculturesIds = response.data.data
            onDeleteAgricultures(deletedAgriculturesIds)
        }

    }, [onDeleteAgricultures])

    const onAgricultureChanged = useCallback(async (agriculture: Agriculture) => {
        const response = await API.postAuthorized<AgricultureDTO[]>(ApiURL.updateAgriculture, {agriculture: [agriculture]})

        if (!response.data.error) {
            const updatedAgricultures = response.data.data
            const agricultures = updatedAgricultures.map(updated => Agriculture.createNew(updated))
            onUpdateAgricultures(agricultures)
            setEditableAgriculture(undefined)
        }

    }, [onUpdateAgricultures])

    const onAgricultureAdd = useCallback(async (agriculture: Agriculture) => {
        const response = await API.postAuthorized<AgricultureDTO[]>(ApiURL.addAgriculture, {agriculture: [agriculture]})

        if (!response.data.error) {
            setIsAddNew(false)
            const addedAgriculturesDTO = response.data.data

            if (notEmptyArray(addedAgriculturesDTO)) {
                const agricultures = addedAgriculturesDTO.map(agro => Agriculture.createNew(agro))
                onAgriculturesAdd(agricultures)
            }
        }
    }, [onAgriculturesAdd])

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
                        onDelete={onDelete}
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