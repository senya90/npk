import React, {FC, useContext, useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {TokensPair} from "models/_types/tokensPair";
import {TokenHelper} from "helpers/tokens";
import {useSelector} from "react-redux";
import {AppContext} from "helpers/contexts/AppContext";

interface PrivateRouteProps {
    component: any
    path: string,
    tokens?: TokensPair
}

type UpdatingState = "INIT" | "PROGRESS" | "DONE"

const PrivateRoute: FC<PrivateRouteProps> = ({
     component,
     ...rest
}) => {
    const {userService} = useContext(AppContext)
    const tokens = useSelector((state: any) => state.user.tokens)
    const [auth, setAuth] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<UpdatingState>("INIT")

    const updateTokens = async (tokens: TokensPair) => {
        try {
            const updatedTokens = await TokenHelper.updateTokens(tokens.refreshToken)
            userService.updateTokens(updatedTokens)
            setIsUpdating("DONE")
        } catch (err) {
            setIsUpdating("DONE")
            console.error(err)
        }
    }

    const setStateForRedirect = () => {
        setIsUpdating("DONE")
        setAuth(false)
    }

    const setStateForPrivate = () => {
        setIsUpdating("DONE")
        setAuth(true)
    }

    const setStateForUpdating = () => {
        setIsUpdating("PROGRESS")
        setAuth(false)
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
                if (isUpdating !== "PROGRESS") {
                    setStateForUpdating()
                    updateTokens(tokens).then()
                }

                return
            }

            setStateForPrivate()
            return
        }

        setStateForRedirect()
    })

    if (isUpdating === "INIT" || isUpdating === "PROGRESS") {
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