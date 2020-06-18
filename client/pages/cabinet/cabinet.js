import React, {useEffect, useState} from 'react';
import MyBreadCrumb from "client/components/MyBreadCrumb";
import {Button} from "reactstrap";
import ErrorPage from "client/components/service/ErrorPage";
import {A, navigate} from "hookrouter"

export default function Cabinet(props) {
    if (!props.authenticatedUser) return <ErrorPage {...{error: 403, message: 'Доступ запрещен'}}/>;
    const [list, setList] = useState([]);

    useEffect(() => {
        props.api(`/cabinet/vote/list`, {sort: {createdAt: -1}})
            .then(setList)
    }, []);


    function voteCreate(e) {
        props.api('/cabinet/vote/create')
            .then(v => navigate(`/cabinet/vote/${v.id}/update`))
    }


    return <div>
        <MyBreadCrumb items={[
            {label: 'Кабинет'},
        ]}/>
        <Button onClick={voteCreate}>Создать голосование</Button>
        <h4>Мои голосования</h4>
        {list.map(l => <div key={l.id}>
            <A href={`/cabinet/vote/${l.id}/update`}>{l.date} - {l.name}</A>
        </div>)}
    </div>

}

