import React from "react";
import MenuTop from "client/components/themes/main/MenuTop";
import "client/components/themes/main.sass"
import "client/components/themes/admin/theme-admin.sass"

export default function (props) {
    return <div className={'main'}>
        <MenuTop {...props}/>
        <div className="container-fluid admin-content">
            {props.errorPage || props.routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
            </footer>
        </div>

    </div>
}
