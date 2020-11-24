import React, {FunctionComponent} from 'react';
import Title from 'atom/title/Title';
import {translate} from 'helpers/translate/translate';
import {AgriculturesProps} from "./AgricultureTypes";

import style from './agriculture.module.scss'
import {AgricultureItem} from "./agricultureItem/AgricultureItem";
import {Agriculture} from 'models/agriculture';
import {BUTTON_TYPE} from "../../atom/button/ButtonTypes";
import {Button} from "../../atom/button/Button";


const AgriculturesView: FunctionComponent<AgriculturesProps> = (props) => {

    const isActive = (agriculture: Agriculture) => {
        return agriculture.id === props.activeAgriculture.id
    }

    return (
        <div className={style.agricultureWrapper}>
            <Title>{translate('agriculture')}</Title>
            {
                props.agricultures.map(agriculture => (
                    <AgricultureItem
                        agriculture={agriculture}
                        key={agriculture.id}
                        isActive={isActive(agriculture)}
                    />
                ))
            }
            <Button
                containerclass={style.addButton}
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addAgriculture')}
            </Button>
        </div>
    )
}

export {AgriculturesView}