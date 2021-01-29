import React, {FC, useState} from 'react';
import {ChemicalAggregate} from "../../../models/chemicalAggregate";

import style from './aggregationConstructor.module.scss'
import { Input } from 'atom/input/Input';
import {AtomConstructor} from "../atomConstructor/AtomConstructor";
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';

interface AggregationConstructorProps {
    aggregation: ChemicalAggregate
}

const AggregationConstructor: FC<AggregationConstructorProps> = ({aggregation}) => {
    const [multiplier, setMultiplier] = useState<number>(aggregation.multiplier)


    const changeMultiplier = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN( Number(e.target.value) )) {
            return
        }
        setMultiplier(Number(e.target.value))
    }

    const renderAtoms = () => {
        return aggregation.atoms.map((atom, index) => <AtomConstructor atom={atom} key={index}/>)
    }

    const addAtom = () => {
        console.log('addAtom')

    }

    return (
        <div className={style.aggregate}>
            <Input
                className={style.multiplier}
                onChange={changeMultiplier}
                value={String(multiplier)}
            />

            {renderAtoms()}
            <Button
                containerclass={style.addAtomButton}
                onClick={addAtom}
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addAtom')}
            </Button>
        </div>
    );
};

export {AggregationConstructor}