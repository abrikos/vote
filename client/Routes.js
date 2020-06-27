import React from "react";
import Home from "client/pages/home/home";
import Login from "client/pages/login/login";
import Cabinet from "client/pages/cabinet/cabinet";
import AdminIndex from "client/pages/admin/AdminIndex";
import Contacts from "client/pages/contacts/contacs";
import SiteMap from "client/pages/SiteMap";
import ModelList from "client/pages/model/ModelList";
import AgendaUpdate from "client/pages/cabinet/VoteUpdate";
import Bulletin from "client/pages/vote/Bulletin";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,

        "/education-content": () => <ModelList key={'ed-content'} title="Содержание образования" modelName="school" filter={{order:'name', where:{educationContent:{$ne:null}}}} {...props}/>,
        "/schools": () => <ModelList key={'school'} title="Школы" modelName="school" filter={{order:'name'}} {...props}/>,
        "/news": () => <ModelList key={'news'} title="Новости" modelName="post" filter={{order: {createdAt:-1}}} {...props}/>,
        "/directors": (params) => <ModelList  key={'directors'} title="Директора школ" modelName="person" filter={{where: {statusId: 1}}} {...props}/>,

        "/wp-admin": () => <Login {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/admin/:control/:id/update": (params) => <AdminIndex {...params} {...props}/>,
        "/cabinet/vote/:id/update": (params) => <AgendaUpdate {...params} {...props}/>,
        "/bulletin/:hash": (params) => <Bulletin {...params} {...props}/>,


        //"/persons/:type": (params) => <PersonListLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,

    };
}
