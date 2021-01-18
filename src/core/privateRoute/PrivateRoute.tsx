import React, {FC, useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {TokensPair} from "../../models/tokensPair";
import {TokenHelper} from "../../helpers/tokens";
import {useDispatch, useSelector} from "react-redux";
import { setTokens } from 'core/redux/userSlice';

interface PrivateRouteProps {
    component: any
    path: string,
    tokens?: TokensPair
}

const PrivateRoute: FC<PrivateRouteProps> = ({
     component,
     ...rest
}) => {
    const dispatch = useDispatch()
    const tokens = useSelector((state: any) => state.user.tokens)
    const [auth, setAuth] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(true)

    const updateTokens = async (tokens: TokensPair) => {
        try {
            setIsUpdating(true)
            const updatedTokens = await TokenHelper.updateTokens(tokens.refreshToken)
            if (updatedTokens) {
                const isActive = TokenHelper.isActive(updatedTokens.accessToken)
                dispatch(setTokens(updatedTokens))
                setAuth(isActive)
            }
            setIsUpdating(false)
        } catch (err) {
            setIsUpdating(false)
            console.error(err)
        }
    }

    const setStateForRedirect = () => {
        console.log('setStateForRedirect')
        setIsUpdating(false)
        setAuth(false)
    }

    const setStateForPrivate = () => {
        console.log('setStateForPrivate')
        setIsUpdating(false)
        setAuth(true)
    }

    useEffect(() => {
        if (tokens) {
            const accessIsActive = TokenHelper.isActive(tokens.accessToken)
            const refreshIsActive = TokenHelper.isActive(tokens.refreshToken)

            if (!refreshIsActive) {
                setStateForRedirect()
                return
            }

            if (!accessIsActive) {
                updateTokens(tokens)
            }

            setStateForPrivate()
            return
        }

        setIsUpdating(false)
        setAuth(false)


    }, [tokens, updateTokens])

    console.log('render auth', auth)
    console.log('render isUpdating', isUpdating)
    console.log('render tokens', tokens)


    if (isUpdating ) {
        console.log('1')
        console.log(' ')
        return <div className="loading"/>
    }

    console.log('2')
    console.log(' ')

    return (
        <Route
            {...rest}
            render={props => {
                if (auth) {
                    const Component = component
                    return <Component {...props}/>
                }
                return <Redirect to="/login"/>
            }}
        />
    )
}

export {PrivateRoute}