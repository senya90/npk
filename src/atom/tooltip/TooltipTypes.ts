export interface TooltipProps {
    title: string
    display?: TTooltipDisplay
    children: JSX.Element
    className?: string
}

export class TOOLTIP_DISPLAY {
    public static BLOCK: TTooltipDisplay = "block"
    public static INLINE_BLOCK: TTooltipDisplay = "inline-block"
}

export type TTooltipDisplay = "inline-block" | "block"