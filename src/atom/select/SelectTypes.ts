export interface SelectProps {
    default: string,
    options: SelectOption[]
    containerStyle?: object,
    containerClass?: string
}

export interface SelectOption {
    value: string,
    label: string,
    children?: SelectOption
}