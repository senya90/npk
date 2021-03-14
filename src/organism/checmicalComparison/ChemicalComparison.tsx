import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from "../../helpers/translate/translate";
import {ChemicalComparisonProps} from "./ChemicalComparisonTypes";
import { Table } from 'organism/table/Table';
import {TableRaw} from "../table/tableRow/TableRaw";
import {TableCell} from "../table/tableCell/TableCell";
import {ChemicalComparisonView} from 'molecule/chemicalComparisonView/ChemicalComparisonView';
import {ChemicalUnitValue} from "../../models/chemicalUnitValue/chemicalUnitValue";
import { ChemicalUnit } from 'models/chemicalUnit';
import { notEmptyArray } from 'helpers/utils';
import {Icon} from "../../atom/icon/Icon";
import {ICON_TYPE} from "../../atom/icon/IconTypes";
import {Gag} from "../../molecule/gag/Gag";

import style from './chemicalConparison.module.scss'
import {colors} from "../../helpers/commonStyle/colors";

const ChemicalComparison: FunctionComponent<ChemicalComparisonProps> = (props) => {

    const getMixedValueFromSolution = (): ChemicalUnitValue[] => {
        if (props.solution && props.solution.dosages) {
            return props.solution.toChemicals()
        }
        return []
    }
    let mixed: ChemicalUnitValue[] = getMixedValueFromSolution();

    const getChemicalFromMix = (chemical: ChemicalUnit): number => {
        if (mixed) {
            const found = mixed.find(chemicalUnitValue => chemicalUnitValue.chemicalUnit.id === chemical.id)
            if (found) {
                return found.value
            }
        }
        return 0
    }

    const renderChemicalComposition = () => {
        return props.chemicals
            .map(chemical => {
                const mixed = getChemicalFromMix(chemical)
                const vegetation = getVegetationValueFromAgriculture(chemical)
                const bloom = getBloomValueFromAgriculture(chemical)

                if (mixed || vegetation || bloom) {
                    return (
                        <ChemicalComparisonView
                            key={chemical.id}
                            chemical={chemical}
                            mixed={mixed}
                            vegetation={vegetation}
                            bloom={bloom}
                        />
                    )
                }

                return undefined
            })
            .filter(domElement => domElement)
    }

    const getVegetationValueFromAgriculture = (chemical: ChemicalUnit): number => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeAgriculture.vegetation))
    }

    const getBloomValueFromAgriculture = (chemical: ChemicalUnit): number => {
        return _ejectResult(_findByChemicalIn(chemical, props.activeAgriculture.bloom))
    }

    const _findByChemicalIn = (targetChemical: ChemicalUnit, source?: ChemicalUnitValue[]): ChemicalUnitValue | undefined => {
        if (source) {
            return source.find(veg => veg.chemicalUnit.id === targetChemical.id)
        }
        return undefined
    }

    const _ejectResult = (chemicalUnitValue?: ChemicalUnitValue) => {
        if (chemicalUnitValue) {
            return chemicalUnitValue.value
        }
        return 0
    }

    const renderedRows = renderChemicalComposition()

    return (
        <div>
            <Title border>{translate('tableSolutions')}</Title>
            {renderedRows && notEmptyArray(renderedRows) ?
                <Table full>
                    <thead>
                    <TableRaw>
                        <TableCell header>{translate('element')}</TableCell>
                        <TableCell header>{translate('mixed')}</TableCell>
                        <TableCell header>{translate('vegetation')}</TableCell>
                        <TableCell header>{translate('bloom')}</TableCell>
                    </TableRaw>
                    </thead>
                    <tbody>
                    {renderedRows}
                    </tbody>
                </Table>
                :
                <div className={style.emptyWrapper}>
                    <Gag
                        icon={
                            <Icon
                                type={ICON_TYPE.Table}
                                size={70}
                                className={`${colors.gag}`}
                            />
                        }
                    >
                        {translate('chooseAgriculture')}
                    </Gag>
                </div>
            }
        </div>
    );
};

export {ChemicalComparison}