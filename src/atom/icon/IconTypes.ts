export interface IconProps {
    type: ICON_TYPE
    className?: string
}

export class ICON_TYPE {
    static readonly RightOutlined = 'RightOutlined'
    static readonly LeftOutlined = 'LeftOutlined'
}