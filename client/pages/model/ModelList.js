import React, {useEffect, useState} from "react";
import Pager from "client/components/Pager";
import * as views from "client/pages"

export default function ModelList(props) {
    const [list, setList] = useState([])
    const [totalCount, setTotalCount] = useState();
    const [filter, setFilter] = useState(props.filter);

    useEffect(()=>{
        const f = filter ? Object.assign(filter, {}) : {where:{}};
        if(!f.where) f.where = {};
        if(!f.limit) f.limit = 12;
        f.skip = 0;
        setFilter(f);
        console.log(f)
        props.api(`/${props.modelName}/list`, f)
            .then(res=>{
                setList(res.list)
                setTotalCount(res.count);
            })
    },[])

    function pageChange(f) {
        props.api(`/${props.modelName}/list`, f).then(res=>setList(res.list));
    }

    return <div className={`${props.modelName}-list`}>
        <h2 className="text-center">{props.title}</h2>
        <div className="list-wrapper">
            {list.map(item=><div key={item.id} className="grid-cell">
                {views[`${props.modelName}Small`]({...item, ...props})}
            </div>)}
        </div>

        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
    </div>
}
