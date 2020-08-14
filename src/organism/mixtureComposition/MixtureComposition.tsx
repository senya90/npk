import React, {FunctionComponent, useContext, useState} from 'react';
import {MixtureCompositionProps} from "./MixtureCompositionTypes";
import {translate} from "../../helpers/translate/translate";
import Title from "../../atom/title/Title";
import DosageView from "../../molecule/dosageView/DosageView";
import {CalculatorContext, CalculatorContextType} from "../../helpers/contexts/CalculatorContext";
import {Fertilizer} from "../../models/fertilizer";
import {Mixture} from "../../models/mixture";
import {Input} from 'atom/input/Input';

const MixtureComposition: FunctionComponent<MixtureCompositionProps> = ({mixture}) => {
    const [mixtureName, setMixtureName] = useState<string>(mixture.name)

    const {onMixtureUpdated} = useContext<CalculatorContextType>(CalculatorContext)

    const renderMixture = () => {
        if (!mixture) {
            return null
        }

        return mixture.dosages.map(dosage => (
            <DosageView
                key={dosage.fertilizer.id}
                dosage={dosage}
                deleteFertilizerFromMixture={onDeleteFertilizerFromMixture}
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

    const onMixtureNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMixtureName(e.target.value)
    }

    return (
        <div>
            <Title>{translate('mixtureComposition')}</Title>
            {mixture &&
                renderMixture()
            }
            {mixture && mixture.dosages.length > 0 &&
                <Input
                    value={mixtureName}
                    onChange={onMixtureNameChanged}
                />
            }

        </div>
    );
};

export {MixtureComposition}