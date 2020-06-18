import React from 'react';
import 'client/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
//import YandexMetrica from "client/components/YandexMetrica";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'client/components/themes/bootstrap.css';
import ThemeMain from "client/components/themes/main/ThemeMain";
import ThemeAdmin from "client/components/themes/admin/ThemeAdmin";

export default function LayoutMenuTop(props) {

    let routeResult = useRoutes(routes(props));
    if (window.location.pathname.match(/^\/admin/)) return <ThemeAdmin routeResult={routeResult} {...props}/>
    return <div>
        {props.theme === 'horizontal' && <ThemeMain routeResult={routeResult} {...props}/>}
    </div>
}


