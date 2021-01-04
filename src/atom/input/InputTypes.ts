import React from "react";

export interface InputProps {
    value: string
    placeholder?: string
    className?: string
    password?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}