import React, {FC, useContext} from 'react';
import {ChemicalAtom} from "../../../../models/chemicalAtom";
import {CalculatorContext} from "../../../../helpers/contexts/CalculatorContext";
import {translate} from "../../../../helpers/translate/translate";
import {Select} from "../../../atom/select/Select";

import style from './atomConstructor.module.scss'
import {isExist} from "../../../../helpers/utils";
import { Input } from 'components/atom/input/Input';
import { Button } from 'components/atom/button/Button';
import {BUTTON_SHAPE, BUTTON_SIZE, BUTTON_TYPE} from 'components/atom/button/ButtonTypes';
import { Icon } from 'components/atom/icon/Icon';
import {ICON_TYPE} from "../../../atom/icon/IconTypes";

interface AtomConstructorProps {
    atom: ChemicalAtom
    changeAtomCount: (atom: ChemicalAtom, count: number) => void
    changeAtom: (updatedAtom: ChemicalAtom, chemicalId: string) => void
    removeAtom: (removedAtom: ChemicalAtom) => void
    disabled?: boolean
}

const AtomConstructor: FC<AtomConstructorProps> = ({atom, changeAtom, changeAtomCount, removeAtom, disabled = true}) => {
    const {chemicals} = useContext(CalculatorContext)

    const changeChemical = (chemicalId: string) => {
        changeAtom(atom, chemicalId)
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

    const decreaseAtom = () => {
        let value = atom.atomsCount - 1
        if (value <= 0) {
           value = 1
        }

        setAtomCount(value)
    }

    const remove = () => {
        removeAtom(atom)
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
                value={atom.chemicalUnit.id}
                options={chemicals.map(chemical => ({
                    label: chemical.name,
                    value: chemical.id
                }))}
                containerclass={style.atomSelect}
                onChange={changeChemical}
                disabled={disabled}
            />
            {isShowAtomsCountInput() &&
                <Input
                    value={String(atom.atomsCount)}
                    className={style.atomCount}
                    onKeyDown={changeCount}
                    disabled={disabled}
                />
            }
            {!disabled &&
                <Button
                    className={style.removeButton}
                    size={BUTTON_SIZE.SMALL}
                    shape={BUTTON_SHAPE.CIRCLE}
                    onClick={remove}
                >
                    <Icon type={ICON_TYPE.Cross} size={8}/>
                </Button>
            }
            {!disabled &&
            <div className={style.atomsCountButtons}>
                <Button
                    className={style.removeAtomButton}
                    size={BUTTON_SIZE.SMALL}
                    shape={BUTTON_SHAPE.CIRCLE}
                    onClick={decreaseAtom}
                >
                    -
                </Button>
                <Button
                    size={BUTTON_SIZE.SMALL}
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