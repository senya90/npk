import React, {FunctionComponent, useContext, useState} from 'react';
import {Fertilizer} from "../../../models/fertilizer/fertilizer";
import {IngredientsView} from "../../molecule/ingredientsView/IngredientsView";

import style from './fertilizerView.module.scss'
import {Icon} from 'components/atom/icon/Icon';
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";
import {translate} from "../../../helpers/translate/translate";
import {Popover} from "../../atom/popover/Popover";
import stylePopover from 'components/atom/popover/popover.module.scss'
import {Button} from "../../atom/button/Button";
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";


interface FertilizerViewProps {
    fertilizer: Fertilizer
    editFertilizer: (fertilizer: Fertilizer) => void
    onDeleteFertilizer: (fertilizerId: string, isConfirm?: boolean) => void
    isShowAdd: boolean
}

const FertilizerView: FunctionComponent<FertilizerViewProps> = ({fertilizer, editFertilizer, isShowAdd, onDeleteFertilizer}) => {
    const [active, setActive] = useState<boolean>(false)
    const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false)
    const {onAddFertilizerToSolution} = useContext(CalculatorContext)

    const toggleActive = () => {
        setActive(!active)
    }

    const edit = (e: React.MouseEvent) => {
        e.stopPropagation()
        editFertilizer(fertilizer)
    }

    const deleteFertilizer = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowTooltip(false)
        onDeleteFertilizer(fertilizer.id)
    }

    const addToSolution = (e: React.MouseEvent) => {
        e.stopPropagation()
        onAddFertilizerToSolution(fertilizer.id)
    }

    const onVisibleChange = (visible: boolean) => {
        setIsShowTooltip(visible)
    }

    const closeTooltip = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowTooltip(false)
    }

    const showTooltip = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShowTooltip(true)
    }

    const footerStyle = active ? `${style.footer} ${style.activeFooter}` : style.footer

    return (
        <div className={style.fertilizer} onClick={toggleActive}>
            <div className={style.name}>{fertilizer.name}</div>
            {isShowAdd &&
                <Icon
                    className={style.addToSolution}
                    type={ICON_TYPE.DoubleRightOutlined}
                    onClick={addToSolution}
                    size={15}
                />
            }
            <div className={footerStyle}>
                <IngredientsView
                    ingredients={fertilizer.ingredients}
                    fullSize={active}
                />
                {active &&
                <div>
                    <Icon
                        type={ICON_TYPE.Edit}
                        size={20}
                        className={style.icon}
                        onClick={edit}
                    />
                    <Popover
                        visible={isShowTooltip}
                        title={`${translate('deleteFertilizer')}?`}
                        onVisibleChange={onVisibleChange}
                        content={
                            <div className={stylePopover.modalButtonsBox}>
                                <Button
                                    className={stylePopover.modalButton}
                                    onClick={closeTooltip}
                                >
                                    {translate('cancel')}
                                </Button>
                                <Button
                                    className={stylePopover.modalButton}
                                    danger
                                    type={BUTTON_TYPE.PRIMARY}
                                    onClick={deleteFertilizer}
                                >
                                    {translate('delete')}
                                </Button>
                            </div>
                        }
                    >
                        <Icon
                            type={ICON_TYPE.Delete}
                            size={20}
                            className={`${style.icon}`}
                            onClick={showTooltip}
                        />
                    </Popover>
                </div>
                }

            </div>

        </div>
    );
};

export {FertilizerView}