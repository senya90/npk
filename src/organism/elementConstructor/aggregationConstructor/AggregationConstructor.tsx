import React, {FC, useState} from 'react';
import {ChemicalAggregate} from "../../../models/chemicalAggregate";

import style from './aggregationConstructor.module.scss'
import { Input } from 'atom/input/Input';
import {AtomConstructor} from "../atomConstructor/AtomConstructor";

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

    return (
        <div className={style.aggregate}>
            <Input
                className={style.multiplier}
                onChange={changeMultiplier}
                value={String(multiplier)}
            />

            {renderAtoms()}
        </div>
    );
};

export {AggregationConstructor}