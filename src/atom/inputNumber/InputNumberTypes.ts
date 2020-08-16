import {ReactText} from "react";

export interface InputNumberProps {
    value?: number
    defaultValue?: number
    isPositive?: boolean
    className?: string
    onChange: (e?: ReactText) => void
}

export type InputTypeValue = number | string | undefined