import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MyBreadCrumb from "client/components/MyBreadCrumb";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import FileUpload from "client/components/file-list/FileUpload";

export default function voteUpdate(props) {
    const [model, setModel] = useState()

    useEffect(() => {
        getModel()
        setInterval(getModel, 5000)

    }, [])

    function getModel() {
        props.api(`/cabinet/vote/${props.id}/view`, null, {noLog: true})
            .then(q => {
                setModel(q)
            })
    }

    function setField(e) {
        const form = {...model}
        switch (e.target.type) {
            case 'checkbox':
                form[e.target.name] = e.target.checked;
                break;
            default:
                form[e.target.name] = e.target.value;
        }
        props.api(`/cabinet/vote/${model.id}/update`, form)
            .then(setModel)
    }

    function uploadDone(files) {
        props.api(`/admin/vote/${model.id}/files/add`, {files})
            .then(q => {
                console.log(q.files)
                props.api(`/admin/vote/${q.id}/file-preview/${q.files[q.files.length - 1].id}`)
                    .then(setModel)

            })
    }

    function addQuestion() {
        props.api(`/cabinet/vote/${model.id}/question/add`)
            .then(setModel)
    }

    function setQuestion(e, id) {
        const body = {}
        body[e.target.name] = e.target.value;
        props.api(`/cabinet/question/${id}/update`, body)
    }

    function prepareBulletins(e) {
        e.preventDefault()
        props.api(`/cabinet/vote/${model.id}/bulletin/prepare`, {count: e.target.count.value})
            .then(setModel)
    }

    function releaseBulletins(e) {
        if (!window.confirm('ВНИМАНИЕ!!! После выпуска бюллетеней редактирование голосования будет НЕДОСТУПНО!')) return
        props.api(`/cabinet/vote/${model.id}/bulletins/release`)
            .then(setModel)
    }

    const copyBulletin = (text) => {
        props.api(`/cabinet/bulletin/${text}/copied`).then(setModel)
        const textField = document.createElement('textarea')
        textField.innerText = window.location.origin + '/bulletin/' + text
        document.body.appendChild(textField)
        textField.select();
        document.execCommand('copy')
        textField.remove();
    }


    if (!model) return <div>empty</div>;
    return <div className="vote">
        <MyBreadCrumb items={[
            {label: 'Кабинет', href: '/cabinet'},
            {label: 'Голосование'},
        ]}/>
        <div className="row">
            <div className="col-sm-4">

                <FormGroup>
                    <Label>Название</Label>
                    <Input defaultValue={model.name} name="name" onChange={setField} invalid={!model.name} disabled={model.published}/>
                    <FormFeedback>Обязательное поле</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label>Количество дней активности</Label>
                    <Input defaultValue={model.days} name="days" onChange={setField} type="number" disabled={model.published}/>
                    <small>0 или меньше - активность не ограничена по-времени</small>
                </FormGroup>

                <h4>Электронные бюллетени </h4>


                {!model.published && <div>
                    <form onSubmit={prepareBulletins} className="row">
                        <div className="col-6">
                            <Input name="count" placeholder="количество"/>
                        </div>
                        <div className="col-6">
                            <Button>Подготовить</Button>
                        </div>
                    </form>
                    бюллетеней подготовлено: <h2 className="d-inline text-success">{model.bulletins.length}</h2>
                    <hr/>
                    <Button color="success" onClick={releaseBulletins}>Выпустить бюллетени</Button>
                </div>}
                {model.published && <div>
                    {/*<Button color="danger" onClick={() => props.api(`/cabinet/vote/${model.id}/restore`).then(setModel)}>TESSST</Button>*/}
                    <table>
                        <tbody>
                    {model.bulletins.map(b => <tr key={b.id}>
                        <td>
                            <Button onClick={() => copyBulletin(b.hash)}>Копировать ссылку</Button>
                        </td>
                        <td>
                            {b.copied && <small className="d-block">Скопирован</small>}
                            {b.signed && <small className="d-block">Подписан</small>}
                            {b.voted && <small className="d-block">Голос учтен</small>}
                        </td>

                    </tr>)}
                        </tbody>
                    </table>
                    Проголосовало: {model.voted} из {model.bulletins.length}
                </div>}


                <div className="d-none">
                    <img src={model.photoPath} alt={model.name} className="img-fluid"/>
                    <FileUpload uploadDone={uploadDone} {...props}/>
                </div>
            </div>


            <div className="col-sm-8">
                <h4>Вопросы поставленные на голосование <Button onClick={addQuestion} className={model.published ? 'd-none' : ''}>Добавить</Button></h4>
                {!model.published && model.questions.map((v, i) => <div key={i}>
                    <FormGroup>
                        <Label>Вопрос № {i+1}</Label>
                        <MarkdownEditor name="name" value={v.name} onChange={e => setQuestion(e, v.id)}/>
                    </FormGroup>
                </div>)}

                {model.published && <table className="table table-striped">
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
                </table>
                }
            </div>
        </div>


    </div>
}
