import React, {FunctionComponent} from 'react';
import style from './title.module.scss'
import cn from 'classnames'

interface TitleProps {
    tag?: string
    border?: boolean
    className?: string
}

const Title: FunctionComponent<TitleProps> = ({tag, border, className, children}) => {

    return (
        <div className={cn(style.title, className, {[style.withBorder]: border})}>
            {children}
        </div>
    );
};

export default Title;