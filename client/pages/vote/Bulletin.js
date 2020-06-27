import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";

export default function Bulletin(props) {
    const [model, setModel] = useState()
    const [bulletin, setBulletin] = useState()
    const [votes, setVotes] = useState({})


    useEffect(() => {
        getModel()
        setInterval(getModel, 5000)

    }, [])

    function getModel() {
        props.api(`/bulletin/${props.hash}/show`, null, {noLog:true})
            .then(v => {
                setBulletin(v.bulletins.find(b => b.hash === props.hash))
                setModel(v)
            })
    }

    function changeVote(q, vote) {
        const vs = {...votes}
        vs[q.id] = vote
        setVotes(vs)
    }

    function doVote() {
        props.api(`/bulletin/${props.hash}/voted`, votes)
            .then(getModel)
    }

    function signBulletin() {
        props.api(`/bulletin/${props.hash}/sign`, votes)
            .then(getModel)
    }

    if (!model) return <div></div>
    if (!bulletin) return <div></div>
    return <div>

        <h1>Бюллетень тайного голосования: <span className="text-primary">{model.name}</span></h1>
        <div className="text-right">{model.date}</div>
        <hr/>
        <div>
            {bulletin.voted ? <div className="alert alert-success">
                    <h3>Спасибо за участие! Ваш голос принят</h3>
                </div> :
                bulletin.signed ? <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Вопрос поставленный на голосование</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {model.questions.map((q,i) => <tr key={q.id}>
                                    <td>{i+i}</td>
                                    <td>{q.name}</td>
                                    <td><Button color={votes[q.id] === 1 ? "success" : "link"} onClick={() => changeVote(q, 1)}>За</Button></td>
                                    <td><Button color={votes[q.id] === 0 ? "warning" : "link"} onClick={() => changeVote(q, 0)}>Против</Button></td>
                                </tr>)}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-6 text-center">{Object.keys(votes).length === model.questions.length && <Button color="primary" onClick={doVote}>Отправить</Button>}</div>
                                <div className="col-6 text-center">{Object.keys(votes).length > 0 && <Button color="secondary" onClick={() => setVotes({})}>Отмена</Button>}</div>
                            </div>
                        </div>
                        :
                        <div>
                            Пожалуйста распишитесь в получении бюллетеня:
                            <Button color="primary" onClick={signBulletin}>Я подтверждаю получение бюллетеня</Button>
                        </div>

            }

        </div>
        {model.complete && <div>
            <h2>РЕЗУЛЬТАТЫ:</h2>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>№</th>
                <th>Вопрос поставленный на голосование</th>
                <th>За</th>
                <th>Против</th>
            </tr>
            </thead>
            <tbody>
            {model.questions.map((q,i)=><tr>
                <td>{i+1}</td>
                <td>{q.name}</td>
                <td>{model.complete && q.for}</td>
                <td>{model.complete && q.against}</td>
            </tr>)}
            </tbody>
        </table></div>}

    </div>
}
