import React, {FunctionComponent, useContext} from 'react';
import {MixtureCompositionProps} from "./MixtureCompositionTypes";
import {translate} from "../../helpers/translate/translate";
import Title from "../../atom/title/Title";
import DosageView from "../../molecule/dosageView/DosageView";
import {CalculatorContext, CalculatorContextType} from "../../helpers/contexts/CalculatorContext";
import {Fertilizer} from "../../models/fertilizer";
import {Mixture} from "../../models/mixture/mixture";
import {Input} from 'atom/input/Input';

import style from './mixtureComposition.module.scss'
import {Dosage} from "../../models/dosage";
import { Button } from 'atom/button/Button';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";

const MixtureComposition: FunctionComponent<MixtureCompositionProps> = ({mixture}) => {
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

    const deleteFertilizerFromMixture = (fertilizer: Fertilizer): Mixture => {
        let updatedMixture = Mixture.getActualMixture(mixture)
        updatedMixture.dosages = updatedMixture.dosages.filter(dosage => dosage.fertilizer.id !== fertilizer.id)
        return updatedMixture
    }

    const onDosageChanged = (updatedDosage: Dosage) => {
        let updatedMixture = Mixture.getActualMixture(mixture)
        updatedMixture.dosages = updatedMixture.dosages.map(dosage => {
            if (dosage.fertilizer.id === updatedDosage.fertilizer.id) {
                return updatedDosage
            }
            return dosage
        })

        onMixtureUpdated(updatedMixture)
    }

    const onMixtureNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedMixture = Mixture.getActualMixture(mixture)
        updatedMixture.name = e.target.value
        onMixtureUpdated(updatedMixture)
    }

    const saveMixtureComposition = () => {
        onMixtureSave()
    }

    return (
        <div>
            <Title>{translate('mixtureComposition')}</Title>
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

export {MixtureComposition}