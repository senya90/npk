import React, {FC} from 'react'
import {Route, Redirect} from 'react-router-dom'

interface PrivateRouteProps {
    component: any
    path: string,
    auth: boolean
}

const PrivateRoute: FC<PrivateRouteProps> = ({
     component,
     auth,
     ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props => {
                console.log('auth', auth)
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