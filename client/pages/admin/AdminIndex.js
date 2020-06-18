import React from "react";
import AdminUser from "client/pages/admin/AdminUser";
import {A} from "hookrouter"
import ErrorPage from "client/components/service/ErrorPage";
import AdminStart from "client/pages/admin/AdminStart";
import {Nav, NavItem} from "reactstrap";
import AdminModel from "client/pages/admin/AdminModel";
import "./admin.sass"

export default function AdminIndex(props) {
    const pages = {

        start: ['Начало', <AdminStart  {...props}/>],
        users: ['Пользователи', <AdminUser  {...props}/>],
        vote: ['Голосования', <AdminModel  {...props}/>],
    };

    if (!props.authenticatedUser.admin) return <ErrorPage error={403}/>;

    return <div>
        <Nav tabs>
            {Object.keys(pages).map(key => <NavItem key={key}><A className={`nav-link ${key === props.control ? 'active' : ''}`} href={`/admin/${key}`}>{pages[key][0]}</A></NavItem>)}
        </Nav>
        <div className="mt-3">
            {pages[props.control] && pages[props.control][1]}
        </div>

    </div>

}
