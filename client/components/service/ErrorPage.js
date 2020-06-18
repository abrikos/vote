import React from 'react';


export default function ErrorPage(props) {
    let message;
    switch (props.error) {
        case 403:
            message = 'Доступ запрещен';
            break;
        case 401:
            message = 'Не авторизован';
            break;
        default:
            message = props.message;

    }

    return <div>
        <h1 className="text-danger">{props.error} {message}</h1>
    </div>
};
