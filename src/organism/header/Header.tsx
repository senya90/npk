import React from 'react';
import {NavLink} from 'react-router-dom';

import {translate} from "helpers/translate/translate";
import {ROUTES} from 'core/routes/routes';

import style from './header.module.scss'

const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.headerContainer}>
                <div>Logo</div>
                <nav className={style.navigation}>
                    <NavLink
                        to={ROUTES.MAIN_PAGE}
                        className={style.link}
                        activeClassName={style.activeLink}
                        exact
                    >
                        {translate('mainPage')}
                    </NavLink>
                    <NavLink
                        to={ROUTES.CALCULATOR}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        {translate('calculatorPage')}
                    </NavLink>
                    <NavLink
                        to={ROUTES.LOGIN}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        {translate('login')}
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export {Header}