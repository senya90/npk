import React, {FunctionComponent, useContext} from 'react';
import {SolutionCompositionProps} from "./SolutionCompositionTypes";
import {translate} from "../../helpers/translate/translate";
import Title from "../../atom/title/Title";
import DosageView from "../dosageView/DosageView";
import {CalculatorContext, CalculatorContextType} from "../../helpers/contexts/CalculatorContext";
import {Fertilizer} from "../../models/fertilizer/fertilizer";
import {Solution} from "../../models/solution/solution";
import {Input} from 'atom/input/Input';

import style from './solutionComposition.module.scss'
import {Dosage} from "../../models/dosage";
import { Button } from 'atom/button/Button';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import { Gag } from 'molecule/gag/Gag';
import { Icon } from 'atom/icon/Icon';
import { ICON_TYPE } from 'atom/icon/IconTypes';

const SolutionComposition: FunctionComponent<SolutionCompositionProps> = ({solution}) => {
    const {onSolutionUpdated, onSolutionSave} = useContext<CalculatorContextType>(CalculatorContext)

    const renderSolution = () => {
        if (!solution) {
            return null
        }

        return solution.dosages.map(dosage => (
            <DosageView
                key={dosage.fertilizer.id}
                dosage={dosage}
                deleteFertilizerFromSolution={onDeleteFertilizerFromSolution}
                onDosageChanged={onDosageChanged}
            />
        ))
    }

    const onDeleteFertilizerFromSolution = (fertilizer: Fertilizer) => {
        onSolutionUpdated(deleteFertilizerFromSolution(fertilizer))
    }

    const deleteFertilizerFromSolution = (fertilizer: Fertilizer): Solution => {
        let updatedSolution = Solution.getActualSolution(solution)
        updatedSolution.dosages = updatedSolution.dosages.filter(dosage => dosage.fertilizer.id !== fertilizer.id)
        return updatedSolution
    }

    const onDosageChanged = (updatedDosage: Dosage) => {
        let updatedSolution = Solution.getActualSolution(solution)
        updatedSolution.dosages = updatedSolution.dosages.map(dosage => {
            if (dosage.fertilizer.id === updatedDosage.fertilizer.id) {
                return updatedDosage
            }
            return dosage
        })

        onSolutionUpdated(updatedSolution)
    }

    const onSolutionNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSolution = Solution.getActualSolution(solution)
        updatedSolution.name = e.target.value
        onSolutionUpdated(updatedSolution)
    }

    const saveSolutionComposition = () => {
        onSolutionSave()
    }

    return (
        <div>
            <Title border>{translate('solutionComposition')}</Title>
            {!solution &&
                <div className={style.gagWrapper}>
                    <Gag
                        icon={
                            <Icon type={ICON_TYPE.Flasks} size={100}/>
                        }
                    >
                        {translate('addFertilizerFromList')}
                    </Gag>
                </div>

            }
            {solution &&
                renderSolution()
            }
            {solution && solution.dosages.length > 0 &&
                <>
                    <Input
                        className={style.solutionName}
                        value={solution.name}
                        onChange={onSolutionNameChanged}
                        placeholder={translate('inputSolutionName')}
                    />
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        onClick={saveSolutionComposition}
                    >
                        {translate('save')}
                    </Button>
                </>
            }

        </div>
    );
};

export {SolutionComposition}