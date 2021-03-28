import React, {FC, useCallback} from 'react';
import ReactDOM from 'react-dom'
import { useCreateModalRoot } from './useCreateModalRoot';
import { createModalElement } from './createModalElement';
import style from './modal.module.scss'
import { Icon } from 'components/atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";

interface ModalProps {
    title?: string
    onClose?: (id: string) => void
}

const Modal: FC<ModalProps> = (props) => {
    const {onClose} = props
    const modalDom = useCreateModalRoot('modal-root')
    const {element, id} = createModalElement(modalDom)

    const closeModal = useCallback(() => {
        if (onClose) {
            onClose(id)
        }
    }, [id, onClose])

    const closeModalByOut = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const getModal = () => {
        return (
            <div className={style.modal} onClick={closeModalByOut}>
                <div className={style.modalWindow} >
                    <div className={style.header}>
                        {props.title &&
                            <div className={style.modalTitle}>{props.title}</div>
                        }
                        <div className={style.closeModal} onClick={closeModal}>
                            <Icon
                                type={ICON_TYPE.Cross}
                                size={20}
                            />
                        </div>
                    </div>
                    <div className={style.modalContent}>
                        {props.children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        ReactDOM.createPortal(
            getModal(),
            element
        )
    )
};

export default Modal;