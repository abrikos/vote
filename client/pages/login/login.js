import React, {useEffect, useState} from 'react';
import {navigate} from "hookrouter";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import vk from "client/files/vkcom.svg"
import TelegramLogin from "client/pages/login/TelegramLogin";
import GoogleLogin from 'react-google-login';

export default function Login(props) {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState()

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const errs = {}
        if (!form.username) errs.username = 'Имя пользователя обязательно';
        if (!form.password) errs.password = 'Пароль обязателен';
        setErrors(errs);
        if (Object.keys(errs).length) return;

        props.api('/login/password', form)
            .then(res => {
                props.login().then(setUser)
            })
            .catch(error => {
                console.error(error)
                setErrors({login: 'Не верные учетные данные'})
            })
    }


    const responseVk = (strategy) => {
        props.api('/redirect/' + strategy, {returnUrl: props.returnUrl}).then(res => {
            console.log(res.url)
            document.location.href = res.url;
        })
    }

    const responseGoogle = (response) => {
        props.api(`/login/google?returnUrl=`, response)
            .then(res => {
                props.login().then(setUser)
            })

    }

    useEffect(()=>{
        if(user) navigate(user.admin ? '/admin/post' : (props.returnUrl || '/cabinet'))
    },[user])

    return <div>
        <h3 className="text-center">Вход с локальными учетными данными</h3>
        <div className={'d-flex justify-content-center'}>
            <div className={'card'}>
                <div className={'card-body'}>
                    <form onSubmit={submit}>
                        <FormGroup>
                            <Label>Имя пользователя</Label>
                            <Input name="username" invalid={!!errors.username}/>
                            <FormFeedback>{errors.username}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <FormGroup>
                            <Label>Пароль</Label>
                            <Input name="password" type="password" invalid={!!errors.password}/>
                            <FormFeedback>{errors.password}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <Button>Войти</Button>
                        <span className="text-danger">{errors.login}</span>
                    </form>

                </div>

            </div>
        </div>
        <hr/>
        <h3 className="text-center">Вход через внешние сервисы</h3>
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-2">
                {props.siteInfo.googleId && <GoogleLogin
                    clientId={props.siteInfo.googleId}
                    buttonText="Вход"
                    onSuccess={responseGoogle}
                    onFailure={console.error}
                    scope="https://www.googleapis.com/auth/analytics"
                />}
            </div>
            {/*<div className="m-2">
                <TelegramLogin {...props}/>
            </div>
            <div className="m-2">
                <Button onClick={() => responseVk('vk')} color="light"><img src={vk} alt="В контакте" style={{width: 50}}/> </Button>
            </div>*/}
        </div>

    </div>


}


