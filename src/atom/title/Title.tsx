import React, {FunctionComponent} from 'react';
import style from './title.module.scss'

interface TitleProps {
    tag?: string
}

const Title: FunctionComponent<TitleProps> = ({tag, children}) => {

    return (
        <div className={style.title}>
            {children}
        </div>
    );
};

export default Title;