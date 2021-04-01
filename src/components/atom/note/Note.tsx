import React, {FC} from 'react';

import style from './note.module.scss'


interface NoteProps {}

const Note: FC<NoteProps> = ({children}) => {
    return (
        <span className={style.note}>
            {children}
        </span>
    );
};

export {Note}