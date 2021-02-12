import React, {FC, useContext} from 'react';
import {Button} from "atom/button/Button";
import {BUTTON_SHAPE} from "atom/button/ButtonTypes";
import {Icon} from "atom/icon/Icon";
import {ICON_TYPE} from "atom/icon/IconTypes";
import cn from "classnames";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";

import style from './chemucalComplexView.module.scss'
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {CalculatorContext} from "helpers/contexts/CalculatorContext";

interface ChemicalComplexViewProps {
    complex: ChemicalComplex
    userId: string | null
}

const ChemicalComplexView: FC<ChemicalComplexViewProps> = ({complex, userId}) => {
    const {onChemicalComplexRemoved} = useContext(CalculatorContext)

    const isOwner = complex.userId === userId
    const complexStyle = cn(style.complexItem, {[style.complexItemNotOwner]: !isOwner})

    const removeComplex = async (complex: ChemicalComplex) => {
        const response = await API.postAuthorized(ApiURL.deleteChemicalComplexes, {id: [complex.id]})
        if (!response.data.error) {
            onChemicalComplexRemoved([complex.id])
        }
    }

    return (
        <div className={complexStyle}>
            <span>{complex.name}</span>
            {isOwner &&
            <Button
                containerclass={style.complexItemDelete}
                shape={BUTTON_SHAPE.CIRCLE}
                onClick={removeComplex.bind(null, complex)}
            >
                <Icon type={ICON_TYPE.Cross} size={8}/>
            </Button>
            }

        </div>
    );
};

export default ChemicalComplexView;