import React, {FunctionComponent, useState} from 'react';
import Title from 'atom/title/Title';
import {translate} from 'helpers/translate/translate';
import {AgriculturesProps} from "./AgricultureTypes";

import style from './agriculture.module.scss'
import {AgricultureItem} from "./agricultureItem/AgricultureItem";
import {Agriculture} from 'models/agriculture';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";
import Modal from 'organism/modal/Modal';
import { AgricultureEditor } from 'organism/agricultureEditor/AgricultureEditor';


const AgriculturesView: FunctionComponent<AgriculturesProps> = (props) => {
    const [isShowEditor, setIsShowEditor] = useState(false)

    const isActive = (agriculture: Agriculture) => {
        return agriculture.id === props.activeAgriculture.id
    }

    const openEditor = () => {
        setIsShowEditor(true)
    }

    const closeEditor = () => {
        setIsShowEditor(false)
    }

    return (
        <div className={style.agricultureWrapper}>
            <Title>{translate('agriculture')}</Title>
            {
                props.agricultures.map(agriculture => (
                    <AgricultureItem
                        agriculture={agriculture}
                        key={agriculture.id}
                        isActive={isActive(agriculture)}
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
            {isShowEditor &&
                <Modal
                    onClose={closeEditor}
                >
                    <AgricultureEditor/>
                </Modal>
            }
        </div>
    )
}

export {AgriculturesView}