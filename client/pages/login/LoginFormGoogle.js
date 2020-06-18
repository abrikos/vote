import GoogleLogin from "react-google-login";
import React, {useEffect, useState} from "react";

export default function LoginFormGoogle(props) {
    const [user, setUser] = useState()
    const responseGoogle = (response) => {
        props.api(`/login/google?returnUrl=`, response)
            .then(res => {
                props.login().then(setUser)
            })

    }

    useEffect(()=>{
        props.userLogged(user)
    },[user])


    return <div className="m-2">
        {props.siteInfo.googleId && <GoogleLogin
            clientId={props.siteInfo.googleId}
            buttonText="Вход"
            onSuccess={responseGoogle}
            onFailure={console.error}
            scope="https://www.googleapis.com/auth/analytics"
        />}
    </div>
}
