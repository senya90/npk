export type DropdownTheme = "light" | "light_contrast" | "dark" | undefined

export interface DropdownProps {
    items: any[],
    theme?: DropdownTheme
}