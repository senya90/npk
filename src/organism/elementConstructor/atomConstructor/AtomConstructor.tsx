import React, {FC, useContext, useState} from 'react';
import cn from 'classnames'
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
    changeAtomCount: (atom: ChemicalAtom, count: number) => void
}

const AtomConstructor: FC<AtomConstructorProps> = ({atom, changeAtomCount}) => {
    const {chemicals} = useContext(CalculatorContext)
    const [currentChemicalId, setCurrentChemicalId] = useState<string>(atom.chemicalUnit.id)

    const changeChemical = (value: string) => {
        setCurrentChemicalId(value)
    }

    const changeCount = (e: any) => {
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
        setAtomCount(atom.atomsCount + 1)
    }

    const removeAtom = () => {
        let value = atom.atomsCount - 1
        if (value <= 0) {
           value = 1
        }

        setAtomCount(value)
    }

    const setAtomCount = (count: number) => {
        changeAtomCount(atom, count)
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
            {isShowAtomsCountInput() &&
                <Input
                    value={String(atom.atomsCount)}
                    className={style.atomCount}
                    onKeyDown={changeCount}
                />
            }

            <div className={style.atomsCountButtons}>
                <Button
                    containerclass={cn(style.atomButton, style.removeAtomButton)}
                    shape={BUTTON_SHAPE.CIRCLE}
                    onClick={removeAtom}
                >
                    -
                </Button>
                <Button
                    containerclass={style.atomButton}
                    type={BUTTON_TYPE.PRIMARY}
                    shape={BUTTON_SHAPE.CIRCLE}
                    onClick={addAtom}
                >
                    +
                </Button>
            </div>

        </div>
    );
};

export {AtomConstructor}