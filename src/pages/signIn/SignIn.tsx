import React, {FC} from 'react';
import {Login} from "../../template/login/Login";
import {Registration} from "../../organism/registration/Registration";
import {SignInProps} from "./SignInTypes";
import {ROUTES} from 'core/routes/routes';

const SignIn: FC<SignInProps> = (props) => {
    console.log('props', props.location)
    const currentPathname = props.location.pathname

    return (
        <div>
            <Login/>
            <Registration/>
        </div>
    );
};

export {SignIn}