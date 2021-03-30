import React, {useContext, useState} from 'react';
import cn from 'classnames'
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
import { Icon } from 'components/atom/icon/Icon';
import { ICON_TYPE } from 'components/atom/icon/IconTypes';
import { Logo } from 'components/atom/logo/Logo';

const Header = () => {
    const {localStorageProvider, onChangeLocale} = useContext(AppContext)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState<boolean>(false)

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

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const navStyle = cn(
        style.navigation,
        {[style.navigationActive]: showMenu}
    )

    return (
        <div className={style.header}>
            <div className={style.headerContainer}>
                <NavLink to={ROUTES.HOME_PAGE}>
                    <Logo/>
                </NavLink>
                <nav className={navStyle}>
                    <NavLink
                        to={ROUTES.HOME_PAGE}
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
                        to={ROUTES.ABOUT_US}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        {translate('aboutUsPage')}
                    </NavLink>
                    <NavLink
                        to={ROUTES.HOW_TO_USE}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        {translate('tutorialPage')}
                    </NavLink>
                    <NavLink
                        to={ROUTES.SUPPORT}
                        className={style.link}
                        activeClassName={style.activeLink}
                    >
                        {translate('supportPage')}
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
                <div className={style.openMenuButton} onClick={toggleMenu}>
                    {showMenu ?
                        <Icon type={ICON_TYPE.Cross} className={style.menuIcon} size={18} />
                        :
                        <Icon type={ICON_TYPE.Menu} className={style.menuIcon} size={18} />
                    }
                </div>
            </div>
        </div>
    );
};

export {Header}