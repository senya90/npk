import {ReactText} from "react";

export interface InputNumberProps {
    value?: number,
    defaultValue?: number,
    isPositive?: boolean,
    onChange: (e?: ReactText) => void
}

export type InputTypeValue = number | string | undefined