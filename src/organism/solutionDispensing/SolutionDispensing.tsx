import React, {FunctionComponent, useState} from 'react';
import cn from 'classnames'
import {Solution} from 'models/solution/solution';
import {SolutionFertilizers} from "./SolutionFertilizers";

import style from './solutionDispensing.module.scss'
import { DispensingContext } from 'helpers/contexts/DispensingContext';
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "atom/icon/IconTypes";


interface MixtureDispensingProps {
    mixture: Solution
}

const SolutionDispensing: FunctionComponent<MixtureDispensingProps> = ({mixture}) => {
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

    return (
        <div className={cn(style.mixture, {[style._mixtureActive] : isShowControls})}>
            {mixture &&
                <>
                    <div className={style.mixtureName} onClick={toggleShow}>
                        {mixture.name}
                        <Icon
                            className={style.open}
                            type={isShowControls ? ICON_TYPE.DownOutlined : ICON_TYPE.RightOutlined }
                            size={15}
                        />
                    </div>

                    {isShowControls &&
                        <DispensingContext.Provider value={{
                            onVolumeChanged: onVolumeChanged,
                            onPercentChanged: onPercentChanged
                        }}>
                            <SolutionFertilizers
                                dosages={mixture.dosages}
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