import React, {useEffect, useState} from 'react';
import MyBreadCrumb from "client/components/MyBreadCrumb";
import {Button, Input} from "reactstrap";
import ErrorPage from "client/components/service/ErrorPage";

export default function Cabinet(props) {
    if (!props.authenticatedUser) return <ErrorPage {...{error: 403, message: 'Доступ запрещен'}}/>;
    const [user, setUser] = useState({});

    useEffect(() => {
        loadUser()
    }, []);

    function loadUser() {
        props.api('/cabinet/user')
            .then(setUser)
    }

    function voteCreate(e) {
        props.api('/vote/create', props.formToObject(e.target))
            .then(props.login())
    }


    return <div>
        <MyBreadCrumb items={[
            {label: 'Кабинет'},
        ]}/>
        <Button onClick={voteCreate}>Создать голосование</Button>

    </div>

}

