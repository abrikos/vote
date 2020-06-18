import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";

export default function VoteProcess(props) {
    const [model, setModel] = useState()

    useEffect(()=>{
        props.api(`/vote/${props.id}/view`)
            .then(setModel)
    },[])

    function doVote(e) {
        console.log(e.target.value)
        props.api(`/vote/${props.id}/process`,{vote:e.target.value})
            .then(setModel)
            .catch(console.warn)
    }

    if(! model) return <div/>
    return <div>
        Проголосовало: {model.votes.length}
        <Button onClick={doVote} value={1} color="success">За</Button>
        <Button onClick={doVote} value={0} color="warning">Против</Button>
    </div>
}
