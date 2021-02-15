import React, {FC, useCallback, useContext, useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {TokensPair} from "models/tokensPair";
import {TokenHelper} from "helpers/tokens";
import {useSelector} from "react-redux";
import {AppContext} from "helpers/contexts/AppContext";

interface PrivateRouteProps {
    component: any
    path: string,
    tokens?: TokensPair
}

const PrivateRoute: FC<PrivateRouteProps> = ({
     component,
     ...rest
}) => {
    const {userService} = useContext(AppContext)
    const tokens = useSelector((state: any) => state.user.tokens)
    const [auth, setAuth] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(true)

    const updateTokens = useCallback( async (tokens: TokensPair) => {
        try {
            setIsUpdating(true)
            const updatedTokens = await TokenHelper.updateTokens(tokens.refreshToken)
            userService.updateTokens(updatedTokens)
            setIsUpdating(false)
        } catch (err) {
            setIsUpdating(false)
            console.error(err)
        }
    }, [userService])

    const setStateForRedirect = () => {
        setIsUpdating(false)
        setAuth(false)
    }

    const setStateForPrivate = () => {
        setIsUpdating(false)
        setAuth(true)
    }

    useEffect(() => {
        if (tokens) {
            const refreshIsActive = TokenHelper.isActive(tokens.refreshToken)
            const accessIsActive = TokenHelper.isActive(tokens.accessToken)

            if (!refreshIsActive) {
                setStateForRedirect()
                return
            }

            if (!accessIsActive) {
                updateTokens(tokens).then()
            }

            setStateForPrivate()
            return
        }

        setStateForRedirect()

    }, [tokens, updateTokens])

    if (isUpdating ) {
        return <div className="loading"/>
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (auth) {
                    const Component = component
                    return <Component {...props}/>
                }

                const target = encodeURI(rest.path)
                return <Redirect to={`/login?targetPath=${target}`}/>
            }}
        />
    )
}

export {PrivateRoute}