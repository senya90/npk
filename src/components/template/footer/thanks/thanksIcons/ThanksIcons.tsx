import React, {FC} from 'react';
import cn from 'classnames'
import { customIcons } from 'components/atom/icon/customIcons';
import {Author} from "models/author/author";

import style from './thanksIcon.module.scss'
import { Utils } from 'helpers/utils';
import {translate} from "../../../../../helpers/translate/translate";

interface ThanksIconsProps {
    className?: string
}


const ThanksIcons: FC<ThanksIconsProps> = ({className}) => {

    const renderAuthors = () => {
        const authors = Author.getCustomIconsAuthors(customIcons)
        const uniqueAuthors = Author.deleteIdentical(authors)

        return uniqueAuthors.map((author, index) => {
            return (
                <span key={index}>
                    <a className={cn(style.thanksLink, style.author)} href={author.authorLink} title={author.name} target='_blank' rel="noreferrer" >{author.name}</a>
                    {Utils.addSpaces(
                        translate('fromSrc')
                    )}
                    <a className={style.thanksLink} href={author.sourceLink} title={author.source} target='_blank' rel="noreferrer" >{author.source}</a>
                    ,{Utils.addSpaces(' ')}
                </span>
            )
        })
    }

    return (
        <div className={className}>
            {translate('thanksForIcons')}:
            <br/>
            {renderAuthors()}
        </div>
    );
};

export {ThanksIcons}