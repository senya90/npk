import React, {FC} from 'react';
import ReactDOM from 'react-dom'
import { useCreateModalRoot } from './useCreateModalRoot';
import { createModalElement } from './createModalElement';
import style from './modal.module.scss'
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";

interface ModalProps {

}

const Modal: FC<ModalProps> = ({children}) => {
    const modalDom = useCreateModalRoot('modal-root')

    if (!modalDom) {
        return null
    }

    const getModal = () => {
        return (
            <div className={style.modal}>
                <div className={style.modalWindow}>
                    <div className={style.header}>
                        <div className={style.closeModal}>
                            <Icon
                                type={ICON_TYPE.Cross}
                                size={20}
                            />
                        </div>
                    </div>
                    <div className={style.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    const {element} = createModalElement(modalDom)

    return (
        ReactDOM.createPortal(
            getModal(),
            element
        )
    )
};

export default Modal;