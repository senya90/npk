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

const SolutionComposition: FunctionComponent<SolutionCompositionProps> = ({mixture}) => {
    const {onMixtureUpdated, onMixtureSave} = useContext<CalculatorContextType>(CalculatorContext)

    const renderMixture = () => {
        if (!mixture) {
            return null
        }

        return mixture.dosages.map(dosage => (
            <DosageView
                key={dosage.fertilizer.id}
                dosage={dosage}
                deleteFertilizerFromMixture={onDeleteFertilizerFromMixture}
                onDosageChanged={onDosageChanged}
            />
        ))
    }

    const onDeleteFertilizerFromMixture = (fertilizer: Fertilizer) => {
        onMixtureUpdated(deleteFertilizerFromMixture(fertilizer))
    }

    const deleteFertilizerFromMixture = (fertilizer: Fertilizer): Solution => {
        let updatedMixture = Solution.getActualMixture(mixture)
        updatedMixture.dosages = updatedMixture.dosages.filter(dosage => dosage.fertilizer.id !== fertilizer.id)
        return updatedMixture
    }

    const onDosageChanged = (updatedDosage: Dosage) => {
        let updatedMixture = Solution.getActualMixture(mixture)
        updatedMixture.dosages = updatedMixture.dosages.map(dosage => {
            if (dosage.fertilizer.id === updatedDosage.fertilizer.id) {
                return updatedDosage
            }
            return dosage
        })

        onMixtureUpdated(updatedMixture)
    }

    const onMixtureNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedMixture = Solution.getActualMixture(mixture)
        updatedMixture.name = e.target.value
        onMixtureUpdated(updatedMixture)
    }

    const saveMixtureComposition = () => {
        onMixtureSave()
    }

    return (
        <div>
            <Title border>{translate('solutionComposition')}</Title>
            {!mixture &&
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
            {mixture &&
                renderMixture()
            }
            {mixture && mixture.dosages.length > 0 &&
                <>
                    <Input
                        className={style.mixtureName}
                        value={mixture.name}
                        onChange={onMixtureNameChanged}
                        placeholder={translate('inputMixtureName')}
                    />
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        onClick={saveMixtureComposition}
                    >
                        {translate('save')}
                    </Button>
                </>
            }

        </div>
    );
};

export {SolutionComposition}