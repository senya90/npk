import React, { FC } from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from "../../../../core/routes/routes";
import {translate} from "../../../../helpers/translate/translate";
import style from './footerNavigation.module.scss'


interface FooterNavigationProps {
    className?: string
}

const FooterNavigation: FC<FooterNavigationProps> = ({className}) => {

    return (
        <div className={className}>
            <Link
                to={ROUTES.HOME_PAGE}
                className={style.link}
            >
                {translate('mainPage')}
            </Link>
            <Link
                to={ROUTES.CALCULATOR}
                className={style.link}
            >
                {translate('calculatorPage')}
            </Link>
            <Link
                to={ROUTES.ABOUT_US}
                className={style.link}
            >
                {translate('aboutUsPage')}
            </Link>
            <Link
                to={ROUTES.TUTORIAL}
                className={style.link}
            >
                {translate('tutorialPage')}
            </Link>
            <Link
                to={ROUTES.SUPPORT}
                className={style.link}
            >
                {translate('supportPage')}
            </Link>
        </div>
    );
};

export {FooterNavigation}