export interface SelectProps {
    value?: string
    default?: string
    options: SelectOption[]
    containerStyle?: object
    containerclass?: string
    onChange: (value: string) => void
}

export interface SelectOption {
    value: string
    label: string
    children?: SelectOption
}