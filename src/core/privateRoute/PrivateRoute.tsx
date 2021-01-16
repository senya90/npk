import React, {FC} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {TokensPair} from "../../models/tokensPair";
import {TokenHelper} from "../../helpers/tokens";

interface PrivateRouteProps {
    component: any
    path: string,
    tokens?: TokensPair
}

const PrivateRouteComponent: FC<PrivateRouteProps> = ({
     component,
     ...rest
}) => {
    let auth = false

    if (rest.tokens) {
        auth = TokenHelper.isActive(rest.tokens.accessToken)
    }

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

const PrivateRoute = connect(
    (state: any) => ({
        tokens: state.user.tokens
    })
)
(PrivateRouteComponent)

export {PrivateRoute}