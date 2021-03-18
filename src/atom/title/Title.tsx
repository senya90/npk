import React, {FunctionComponent} from 'react';
import style from './title.module.scss'
import cn from 'classnames'

type BottomMargin = 'none' | 'little' | 'middle' | 'large'

interface TitleProps {
    tag?: string
    border?: boolean
    bottomMargin?: BottomMargin
    className?: string
}

const Title: FunctionComponent<TitleProps> = ({
    tag,
    bottomMargin,
    border,
    className,
    children
}) => {

    return (
        <div
            className={
                cn(
                    style.title,
                    {[style[`bottom_${bottomMargin}`]]: bottomMargin},
                    className,
                    {[style.withBorder]: border}
                    )
            }
        >
            {children}
        </div>
    );
};

export {Title}