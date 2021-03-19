import React, {FC, useContext} from 'react';

import {ChemicalAggregate} from "models/chemicalAggregate/chemicalAggregate";
import { Input } from 'atom/input/Input';
import {AtomConstructor} from "../atomConstructor/AtomConstructor";
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import {BUTTON_SHAPE, BUTTON_SIZE, BUTTON_TYPE} from 'atom/button/ButtonTypes';
import {ChemicalAtom} from "models/chemicalAtom";

import style from './aggregationConstructor.module.scss'
import {ElementConstructorContext} from "../../../helpers/contexts/ElementConstructorContext";
import { Icon } from 'atom/icon/Icon';
import {ICON_TYPE} from "../../../atom/icon/IconTypes";


interface AggregationConstructorProps {
    aggregation: ChemicalAggregate
    disabled?: boolean
}

const MIN_MULTIPLIER = 1

const AggregationConstructor: FC<AggregationConstructorProps> = ({aggregation, disabled = true}) => {
    const {onChangeAggregationMultiplier, onChangeAtom, onChangeAtomCount, onRemoveAtom, onAddAtom, onRemoveAggregation} = useContext(ElementConstructorContext)

    const changeMultiplier = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (isNaN(value)) {
            return
        }

        if (value === 0) {
            onChangeAggregationMultiplier(aggregation, MIN_MULTIPLIER)
            return
        }
        onChangeAggregationMultiplier(aggregation, value)
    }

    const addMultiplier = () => {
        onChangeAggregationMultiplier(aggregation, aggregation.multiplier + 1)
    }

    const removeMultiplier = () => {
        let value = aggregation.multiplier - 1
        if (value <= 0) {
            value = MIN_MULTIPLIER
        }

        onChangeAggregationMultiplier(aggregation, value)
    }

    const changeAtomCount = (atom: ChemicalAtom, count: number) => {
        onChangeAtomCount(aggregation, atom, count)
    }

    const removeAtom = (removedAtom: ChemicalAtom) => {
        onRemoveAtom(aggregation, removedAtom)
    }

    const changeAtom = (updatedAtom: ChemicalAtom, chemicalId: string) => {
        onChangeAtom(aggregation, updatedAtom, chemicalId)
    }

    const renderAtoms = () => {
        return aggregation.atoms.map((atom, index) => {
            return (
                <AtomConstructor atom={atom} key={index} changeAtomCount={changeAtomCount} removeAtom={removeAtom} changeAtom={changeAtom} disabled={disabled}/>
            )
        })
    }

    const addAtom = () => {
        onAddAtom(aggregation)
    }

    const isShowMultiplier = () => {
        return aggregation.multiplier > 1
    }

    const removeAggregation = () => {
        onRemoveAggregation(aggregation)
    }

    return (
        <div className={style.aggregate}>
            {isShowMultiplier() ?
                <div className={style.multiplierWrapper}>
                    <Input
                        className={style.multiplier}
                        onChange={changeMultiplier}
                        value={String(aggregation.multiplier)}
                        disabled={disabled}
                    />
                    {!disabled &&
                        <div className={style.multiplierButtons}>
                            <Button
                                className={style.smallButtonRemove}
                                size={BUTTON_SIZE.SMALL}
                                shape={BUTTON_SHAPE.CIRCLE}
                                onClick={removeMultiplier}
                            >
                                -
                            </Button>
                            <Button
                                size={BUTTON_SIZE.SMALL}
                                type={BUTTON_TYPE.PRIMARY}
                                shape={BUTTON_SHAPE.CIRCLE}
                                onClick={addMultiplier}
                            >
                                +
                            </Button>
                        </div>
                    }
                </div>
                :
                <Button
                    className={style.addMultiplierButton}
                    shape={BUTTON_SHAPE.CIRCLE}
                    type={BUTTON_TYPE.PRIMARY}
                    onClick={addMultiplier}
                    disabled={disabled}
                >
                    +
                </Button>
            }
            {renderAtoms()}
            {!disabled &&
                <Button
                    className={style.addAtomButton}
                    onClick={addAtom}
                    type={BUTTON_TYPE.PRIMARY}
                >
                    + {translate('addAtom')}
                </Button>
            }
            <Button
                className={style.removeAggregation}
                onClick={removeAggregation}
            >
                <Icon type={ICON_TYPE.Cross} size={10}/>
            </Button>
        </div>
    );
};

export {AggregationConstructor}