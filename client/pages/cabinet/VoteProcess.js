import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import MarkDown from "react-markdown";

export default function VoteProcess(props) {
    const [model, setModel] = useState()
    const cookieName = 'hasbhueXX' + props.id;
    const [alreadyVoted, setAlreadyVoted] = useState(props.getCookie(cookieName))




    useEffect(() => {
        props.api(`/vote/${props.id}/view`)
            .then(setModel)
        console.log('zzzzzzzzzzzz',)
    }, [])

    function doVote(e) {
        props.api(`/vote/${props.id}/process`, {vote: e.target.value})
            .then(v=> {
                setModel(v)
                setAlreadyVoted(1)
                const d = new Date().valueOf() + 1000 * 3600 * 24 * model.days;
                props.setCookie(cookieName, 15, {expires: d})
            })
            .catch(console.warn)
    }

    if (!model) return <div></div>
    return <div>
        <h1><span className="text-success">Тайное голосование:</span> {model.name}</h1>
        <div className="alert alert-info"><MarkDown source={model.description}/></div>
        {!model.count && <div className="alert alert-danger">Автор не установил количество голосующих</div>}
        Проголосовало: <strong>{model.votes.length}</strong>,
        Не проголосовало: <strong>{model.count - model.votes.length}</strong>,
        {model.enabled ? <div>
                {alreadyVoted ? <div>
                    <h3>Ваш голос принят</h3>
                </div>:<div>
                    <h3>Ваш выбор:</h3>
                    <Button onClick={doVote} value={1} color="success">За</Button>
                    <Button onClick={doVote} value={0} color="warning">Против</Button>
                </div>}

            </div>
            :
            <div>
                <h3>Голосование окончено</h3>
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="text-success text-center">За</th>
                        <th className="text-warning text-center">Против</th>
                    </tr>
                    <tr>
                        <td className="text-success text-center"><h2>{model.for}</h2></td>
                        <td className="text-warning text-center"><h2>{model.against}</h2></td>
                    </tr>
                    </tbody>
                </table>
            </div>}
    </div>
}
