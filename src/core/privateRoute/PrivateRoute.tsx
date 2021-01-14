import React, {FC, Component, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AppContext} from "helpers/contexts/AppContext";

interface PrivateRouteProps {
    component: Component | FC
    path: string
}

const PrivateRoute: FC<PrivateRouteProps> = ({component: any, ...rest}) => {
    const {localStorageProvider} = useContext(AppContext)

    return (
        <Route
            {...rest}
            render={props => (true ? <Redirect to="/login"/> : <Component {...props} />)}
        />
    )
}

export {PrivateRoute}