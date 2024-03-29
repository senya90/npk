import React from "react";

type InputMode = 'default' | 'borderBottom'

export interface InputProps {
    value: string
    placeholder?: string
    className?: string
    password?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyUp?: any
    onKeyDown?: any
    mode?: InputMode
    disabled?: boolean
}