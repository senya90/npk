export interface SwitcherProps {
    items: SwitcherItem[]
    onChange?: (id: any) => void
    active?: string
    className?: string

}

type SwitcherItem = {
    id: string,
    element: JSX.Element
}