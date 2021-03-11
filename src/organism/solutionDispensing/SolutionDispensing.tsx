import React, {FunctionComponent, useContext, useState} from 'react';
import cn from 'classnames'
import {Solution} from 'models/solution/solution';
import {SolutionFertilizers} from "./SolutionFertilizers";

import style from './solutionDispensing.module.scss'
import { DispensingContext } from 'helpers/contexts/DispensingContext';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "atom/icon/IconTypes";
import {translate} from "../../helpers/translate/translate";
import stylePopover from "atom/popover/popover.module.scss";
import {Button} from "../../atom/button/Button";
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Popover} from "../../atom/popover/Popover";
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";


interface SolutionDispensingProps {
    solution: Solution
}

const SolutionDispensing: FunctionComponent<SolutionDispensingProps> = ({solution}) => {
    const {onDeleteSolution, onEditSolution} = useContext(CalculatorContext)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(0)
    const [percent, setPercent] = useState<number>(100)
    const [isShowControls, setIsShowControls] = useState<boolean>(true)

    const onVolumeChanged = (volume: number) => {
        setVolume(volume)
    }

    const onPercentChanged = (percent: number) => {
        setPercent(percent)
    }

    const toggleShow = () => {
        setIsShowControls(!isShowControls)
    }

    const edit = () => {
        onEditSolution(solution)
    }

    const deleteSolution = () => {
        onDeleteSolution(solution)
    }

    const onVisibleChange = (visible: boolean) => {
        setIsShowModal(visible)
    }

    const showModal = () => {
        setIsShowModal(true)
    }

    const closeModal = () => {
        setIsShowModal(false)
    }

    return (
        <div className={cn(style.solution, {[style._solutionActive] : isShowControls})}>
            {solution &&
                <>
                    <div className={style.topLine}>
                        <div className={style.solutionName} onClick={toggleShow}>
                            {solution.name}
                            <Icon
                                className={style.open}
                                type={isShowControls ? ICON_TYPE.DownOutlined : ICON_TYPE.RightOutlined }
                                size={15}
                            />
                        </div>
                        <div>
                            <Icon
                                className={style.topLineButton}
                                type={ICON_TYPE.Edit}
                                size={25}
                                onClick={edit}
                            />
                            <Popover
                                visible={isShowModal}
                                title={`${translate('deleteSolution')}?`}
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
                                            onClick={deleteSolution}
                                        >
                                            {translate('delete')}
                                        </Button>
                                    </div>
                                }
                            >
                                <Icon
                                    className={style.topLineButton}
                                    type={ICON_TYPE.Delete}
                                    size={25}
                                    onClick={showModal}
                                />
                            </Popover>

                        </div>
                    </div>
                    {isShowControls &&
                        <DispensingContext.Provider value={{
                            onVolumeChanged: onVolumeChanged,
                            onPercentChanged: onPercentChanged
                        }}>
                            <SolutionFertilizers
                                dosages={solution.dosages}
                                volume={volume}
                                percent={percent}
                            />
                        </DispensingContext.Provider>
                    }
                </>
            }
        </div>
    );
};

export {SolutionDispensing}