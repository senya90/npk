import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {translate, Locale, getLocale} from "helpers/translate/translate";
import {ROUTES} from 'core/routes/routes';

import style from './header.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {TokenHelper} from "helpers/tokens";
import {TokensPair} from "models/_types/tokensPair";
import { User } from 'models/_types/user';
import {AppContext} from "helpers/contexts/AppContext";
import {resetAuth} from "core/redux/userSlice";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {Dropdown} from "../../atom/dropdown/Dropdown";
import {Switcher} from "../../atom/switcher/Switcher";

const Header = () => {
    const {localStorageProvider, onChangeLocale} = useContext(AppContext)
    const dispatch = useDispatch()
    const userStore = useSelector((state: any) => state.user)
    const tokens: TokensPair = userStore.tokens
    const user: User = userStore.user
    const isAuth: boolean = (tokens && TokenHelper.isActive(tokens.accessToken))

    const logout = async () => {
        await API.postAuthorized(ApiURL.logout)
        localStorageProvider.clearTokens()
        dispatch(resetAuth())
    }

    const changeLocale = (locale: Locale) => {
        onChangeLocale(locale)
    }

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
                    <Switcher
                        items={[
                            {
                                id: 'en',
                                element: <span>en</span>
                            },
                            {
                                id: 'ru',
                                element: <span>ru</span>
                            },
                        ]}
                        active={getLocale()}
                        className={style.language}
                        onChange={changeLocale}
                    />
                    {isAuth ?
                        <Dropdown
                            theme={"light_contrast"}
                            items={[
                                <div
                                    key={'exit'}
                                    className={style.logout}
                                    onClick={logout}
                                >
                                    {translate('logout')}
                                </div>
                            ]}
                        >
                            <div className={style.usernameWrapper}>
                                <div className={style.username}>{user.login}</div>
                            </div>
                        </Dropdown>

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