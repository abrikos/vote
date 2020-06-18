import React, {useEffect, useState} from "react";
import {A} from "hookrouter"
import siteMap from "client/components/site-map-compiled.json"

export default function SiteMap(props) {

    return <div>
        <ul>
            {siteMap.map((s, i) => <li key={i}>
                {s.path ? <A href={s.path}>{s.label}</A>:s.label}
                {s.items && <ul>
                    {s.items.filter(s=>s.path).map((s2,i2)=><li key={i2}><A href={s2.path} className={s2.className}>{s2.label}</A></li>)}
                </ul>}
            </li>)}
        </ul>
    </div>
}
