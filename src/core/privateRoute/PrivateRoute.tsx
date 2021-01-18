import React, {FC, useContext, useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {TokensPair} from "../../models/tokensPair";
import {TokenHelper} from "../../helpers/tokens";
import {AppContext} from "../../helpers/contexts/AppContext";

interface PrivateRouteProps {
    component: any
    path: string,
    tokens?: TokensPair
}

const PrivateRoute: FC<PrivateRouteProps> = ({
     component,
     ...rest
}) => {
    const {tokens} = useContext(AppContext)
    const [auth, setAuth] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(true)

    useEffect(() => {
        console.log('useEffect')
        if (tokens) {
            const accessIsActive = TokenHelper.isActive(tokens.accessToken)

            if (!accessIsActive) {
                setIsUpdate(true)
                TokenHelper.updateTokens(tokens.refreshToken)
                    .then(response => {
                        console.log('response', response)

                        if (response) {
                            const isActive = TokenHelper.isActive(response.accessToken)
                            setAuth(isActive)
                        }
                        setIsUpdate(false)

                    })
                    .catch(err => {
                        setIsUpdate(false)
                        console.log(err)
                    })
            }
        }
    }, [tokens])

    console.log('render tokens', tokens)
    console.log('render auth', auth)
    console.log('render isUpdate', isUpdate)

    console.log('1')
    if (isUpdate) {
        console.log('2')
        console.log(' ')
        return <div></div>
    }

    console.log('3')
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