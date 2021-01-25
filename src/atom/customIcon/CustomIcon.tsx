import React, {FC} from 'react';
import {customIcons} from "../icon/customIcons";

interface CustomIconProps {
    iconType: any
    size?: number
    color?: string
    className?: string
    onClick?: (e: React.MouseEvent) => void
}

const CustomIcon: FC<CustomIconProps> = ({
    iconType,
    color = "000000",
    size = 30,
    className,
    onClick,
children
}) => {
    const icon = customIcons[iconType]


    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={icon.viewBox} width={size} height={size}>
            {icon.image}
        </svg>

    )
}

export {CustomIcon}