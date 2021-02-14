import React, {useContext} from 'react';
import cn from 'classnames'
import {NavLink} from 'react-router-dom';

import {translate} from "helpers/translate/translate";
import {ROUTES} from 'core/routes/routes';

import style from './header.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {TokenHelper} from "helpers/tokens";
import {TokensPair} from "models/tokensPair";
import { User } from 'models/user';
import {AppContext} from "helpers/contexts/AppContext";
import {resetAuth} from "core/redux/userSlice";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";

const Header = () => {
    const {localStorageProvider} = useContext(AppContext)
    const dispatch = useDispatch()
    const userStore = useSelector((state: any) => state.user)
    const tokens: TokensPair = userStore.tokens
    const user: User = userStore.user
    const isAuth: boolean = (tokens && TokenHelper.isActive(tokens.accessToken))

    const logout = async () => {
        localStorageProvider.clearTokens()
        dispatch(resetAuth())
        await API.postAuthorized(ApiURL.logout, {userId: user.userId})
    }

    return (
        <div className={style.header}>
            <div className={style.headerContainer}>
                <div>Logo</div>
                <nav className={style.navigation}>
                    {isAuth &&
                        <div className={style.username}>{user.login}</div>
                    }
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
                    {isAuth ?
                        <div
                            className={cn(style.link, style.logout)}
                            onClick={logout}
                        >
                            {translate('logout')}
                        </div>
                        :
                        <NavLink
                            to={ROUTES.LOGIN}
                            className={style.link}
                            activeClassName={style.activeLink}
                        >
                            {translate('login')}
                        </NavLink>
                    }
                </nav>
            </div>
        </div>
    );
};

export {Header}