import React, {FunctionComponent, useState} from 'react';
import cn from 'classnames'
import {Solution} from 'models/solution/solution';
import {SolutionFertilizers} from "./SolutionFertilizers";

import style from './solutionDispensing.module.scss'
import { DispensingContext } from 'helpers/contexts/DispensingContext';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "atom/icon/IconTypes";


interface SolutionDispensingProps {
    solution: Solution
}

const SolutionDispensing: FunctionComponent<SolutionDispensingProps> = ({solution}) => {
    const [volume, setVolume] = useState<number>(0)
    const [percent, setPercent] = useState<number>(100)
    const [isShowControls, setIsShowControls] = useState<boolean>(false)

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
        console.log('edit')
    }

    const deleteSolution = () => {
        console.log('deleteSolution')
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
                        {isShowControls &&
                            <div>
                                <Icon
                                    className={style.topLineButton}
                                    type={ICON_TYPE.Edit}
                                    size={25}
                                    onClick={edit}
                                />
                                <Icon
                                    className={style.topLineButton}
                                    type={ICON_TYPE.Delete}
                                    size={25}
                                    onClick={deleteSolution}
                                />
                            </div>
                        }
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