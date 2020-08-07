import React, {FunctionComponent} from 'react';
import {SelectProps} from "./SelectTypes";
import {Select as SelectAnt} from 'antd'

const Select: FunctionComponent<SelectProps> = (props) => {

    const renderOptions = () => {
        return props.options.map(option => (
                <SelectAnt.Option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </SelectAnt.Option>
            )
        )
    }

    return (
        <SelectAnt
            defaultValue={props.default}
            style={props.containerStyle}
            className={props.containerClass}
        >
            {renderOptions()}
        </SelectAnt>
    );
};

export {Select}