import React, {FC, useContext, useState} from 'react';
import {ChemicalAtom} from "../../../models/chemicalAtom";
import {CalculatorContext} from "../../../helpers/contexts/CalculatorContext";
import {translate} from "../../../helpers/translate/translate";
import {Select} from "../../../atom/select/Select";

import style from './atomConstructor.module.scss'
import {isExist} from "../../../helpers/utils";
import { Input } from 'atom/input/Input';
import { Button } from 'atom/button/Button';
import { BUTTON_SHAPE, BUTTON_TYPE } from 'atom/button/ButtonTypes';

interface AtomConstructorProps {
    atom: ChemicalAtom
}

const AtomConstructor: FC<AtomConstructorProps> = ({atom}) => {
    const {chemicals} = useContext(CalculatorContext)
    const [currentChemicalId, setCurrentChemicalId] = useState<string>(atom.chemicalUnit.id)
    const [atomCount, setAtomCount] = useState<number>(atom.atomsCount)

    const changeChemical = (value: string) => {
        setCurrentChemicalId(value)
    }

    const changeAtomCount = (e: any) => {
        const value = e.key
        if (isNaN(value)) {
            return
        }

        if (!isExist(value) || Number(value) <= 0) {
            setAtomCount(1)
            return
        }
        setAtomCount(Number(value))
    }

    const addAtom = () => {
        setAtomCount(atomCount + 1)
    }

    const isShowAtomsCountInput = (): boolean => {
        return atom.atomsCount > 1
    }

    return (
        <div className={style.atom}>
            <Select
                default={translate('selectElement')}
                value={currentChemicalId}
                options={chemicals.map(chemical => ({
                    label: chemical.name,
                    value: chemical.id
                }))}
                containerclass={style.atomSelect}
                onChange={changeChemical}
            />
            {isShowAtomsCountInput() ?
                <Input
                    value={String(atomCount)}
                    className={style.atomCount}
                    onKeyDown={changeAtomCount}
                />
                :
                <div className={style.atomsCountButtons}>
                    <Button
                        containerclass={style.addAtomButton}
                        type={BUTTON_TYPE.PRIMARY}
                        shape={BUTTON_SHAPE.CIRCLE}
                        onClick={addAtom}
                    >
                        +
                    </Button>
                </div>

            }

        </div>
    );
};

export {AtomConstructor}