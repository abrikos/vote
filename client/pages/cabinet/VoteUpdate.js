import React, {useEffect, useState} from "react";
import {FormGroup, Input, Label} from "reactstrap";
import MyBreadCrumb from "client/components/MyBreadCrumb";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import FileUpload from "client/components/file-list/FileUpload";
import VoteProcess from "client/pages/cabinet/VoteProcess";

export default function VoteUpdate(props) {
    const [model, setModel] = useState()

    useEffect(() => {
        props.api(`/cabinet/vote/${props.id}/view`)
            .then(q => {
                setModel(q)
            })
    }, [])

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
    }

    function uploadDone(files) {
        props.api(`/admin/vote/${model.id}/files/add`, {files})
            .then(q => {
                console.log(q.files)
                props.api(`/admin/vote/${q.id}/file-preview/${q.files[q.files.length - 1].id}`)
                    .then(setModel)

            })
    }


    if (!model) return <div></div>;
    return <div className="vote">
        <MyBreadCrumb items={[
            {label: 'Кабинет', href: '/cabinet'},
            {label: 'Голосование'},
        ]}/>
        <div className="row">
            <div className="col-sm-8">

                <FormGroup>
                    <Label>Название</Label>
                    <Input defaultValue={model.name} name="name" onChange={setField}/>
                </FormGroup>

                <FormGroup>
                    <Label>Описание</Label>
                    <MarkdownEditor name="description" value={model.description} onChange={setField}/>
                </FormGroup>

                <FormGroup>
                    <Label>Количество голосов</Label>
                    <Input defaultValue={model.count} name="count" onChange={setField} type="number"/>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="published" onChange={setField} defaultChecked={model.published}/>
                        Опубликовано
                    </Label>
                </FormGroup>
            </div>
            <div className="col-sm-4">
                <img src={model.photoPath} alt={model.name} className="img-fluid"/>
                <FileUpload uploadDone={uploadDone} {...props}/>
            </div>
        </div>

        <VoteProcess {...props}/>
    </div>
}
