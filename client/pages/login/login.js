import React from 'react';
import LoginFormVk from "client/pages/login/LoginFormVk";
import LoginFormGoogle from "client/pages/login/LoginFormGoogle";

export default function Login(props) {

    return <div>

        <h3 className="text-center">Вход через внешние сервисы</h3>
        <div className="d-flex justify-content-center align-items-center">

            <div className="m-2">
                <LoginFormVk {...props}/>
            </div>
            <div className="m-2">
                <LoginFormGoogle {...props}/>
            </div>
        </div>

    </div>


}


