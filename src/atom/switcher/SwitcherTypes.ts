export interface SwitcherProps {
    items: SwitcherItem[]
    onChange?: () => void
    active?: string
    className?: string

}

type SwitcherItem = {
    id: string,
    element: JSX.Element
}