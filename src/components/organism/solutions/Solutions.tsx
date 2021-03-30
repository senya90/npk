import React, {FunctionComponent} from 'react';
import {Title} from 'components/atom/title/Title';
import {translate} from "../../../helpers/translate/translate";
import { SolutionProps } from './SolutionTypes';
import {SolutionDispensing} from "../solutionDispensing/SolutionDispensing";

import style from './solution.module.scss'
import {Icon} from "../../atom/icon/Icon";
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {Gag} from "../../molecule/gag/Gag";
import {isEmptyArray} from "../../../helpers/utils";


const Solutions: FunctionComponent<SolutionProps> = ({solutions}) => {

    const renderSolutions = () => {
        return solutions.map(solution => <SolutionDispensing key={solution.id} solution={solution}/>)
    }

    const isShowGag = () => {
        return !solutions || isEmptyArray(solutions)
    }

    return (
        <div>
            <Title>{translate('readySolutions')}</Title>
            {isShowGag() ?
                <div className={style.gagWrapper}>
                    <Gag
                        icon={
                            <Icon type={ICON_TYPE.BucketWithLiquid} size={100}/>
                        }
                    >
                        {translate('createSolutions')}
                    </Gag>
                </div>
                :
                <div className={style.solutionsBox}>
                    {renderSolutions()}
                </div>
            }
        </div>

    );
};

export {Solutions}