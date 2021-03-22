import React, {FunctionComponent, useContext} from 'react';
import {Agriculture} from "../../../models/agriculture";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";
import cn from 'classnames'

import style from './agricultureItem.module.scss'
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../../atom/icon/IconTypes";
import {translate} from "../../../helpers/translate/translate";
import stylePopover from "../../../atom/popover/popover.module.scss";
import {Button} from "../../../atom/button/Button";
import {BUTTON_TYPE} from "../../../atom/button/ButtonTypes";
import {Popover} from "../../../atom/popover/Popover";


export interface AgricultureItemProps {
    agriculture: Agriculture
    isActive?: boolean
    onEdit: (agriculture: Agriculture) => void
    onDelete: (agriculture: Agriculture) => void
}

const AgricultureItem: FunctionComponent<AgricultureItemProps> = ({agriculture, isActive, onEdit, onDelete}) => {
    const {onAgricultureSelect} = useContext(CalculatorContext)
    const [isShowTooltip, setIsShowTooltip] = React.useState<boolean>(false)

    const selectAgriculture = () => {
        onAgricultureSelect(agriculture)
    }

    const edit = () => {
        onEdit(agriculture)
    }

    const deleteAgriculture = () => {
        onDelete(agriculture)
        setIsShowTooltip(false)
    }

    const onVisibleChange = (visible: boolean) => {
        setIsShowTooltip(visible)
    }

    const closeTooltip = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowTooltip(false)
    }

    const showTooltip = (e: React.MouseEvent) => {
        e && e.stopPropagation()
        setIsShowTooltip(true)
    }

    return (
        <div
            onClick={selectAgriculture}
            className={cn(style.agriculture, {[style.activeAgriculture]: isActive})}>
            {agriculture.name}
            <div className={style.controls}>
                <Icon
                    onClick={edit}
                    type={ICON_TYPE.Edit}
                    className={style.controlsIcon}
                    size={18}
                />
                <Popover
                    visible={isShowTooltip}
                    title={`${translate('deleteAgriculture')}?`}
                    onVisibleChange={onVisibleChange}
                    content={
                        <div className={stylePopover.modalButtonsBox}>
                            <Button
                                data-test-id={'close-popover'}
                                className={stylePopover.modalButton}
                                onClick={closeTooltip}
                            >
                                {translate('cancel')}
                            </Button>
                            <Button
                                data-test-id={'delete-agriculture'}
                                className={stylePopover.modalButton}
                                danger
                                type={BUTTON_TYPE.PRIMARY}
                                onClick={deleteAgriculture}
                            >
                                {translate('delete')}
                            </Button>
                        </div>
                    }
                >
                    <Icon
                        data-test-id={'open-popover'}
                        type={ICON_TYPE.Delete}
                        className={style.controlsIcon}
                        size={18}
                        onClick={showTooltip}
                    />
                </Popover>

            </div>

        </div>
    );
};

export {AgricultureItem}