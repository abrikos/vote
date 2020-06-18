import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/main/theme-main.sass"
import MenuTop from "client/components/themes/main/MenuTop";
import {navigate} from "hookrouter";

export default function ThemeMain(props) {


    return <div className="theme-main">
        <div className="container">
            <MenuTop {...props}/>
            {props.errorPage || props.routeResult}
        </div>

    </div>
}
