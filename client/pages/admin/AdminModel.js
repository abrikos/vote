import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {A, navigate} from "hookrouter";
import FileUpload from "client/components/file-list/FileUpload";
import FileList from "client/components/file-list/FileList";
import InputModel from "client/components/inputModel/InputModel";
import Pager from "client/components/Pager";


export default function (props) {
    const [edited, setEdited] = useState(false);
    const [schema, setSchema] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [list, setList] = useState([]);
    const [model, setModel] = useState();
    const [errors, setErrors] = useState({});
    const [filter, setFilter] = useState({});
    const modelName = props.control;

    useEffect(() => {
        props.api(`/${modelName}/schema`)
            .then(s => {
                setModel(null)
                setSchema(s);
                setFilter(s)
                const f = {limit:10}
                f.order = s.formOptions.listOrder;
                console.log(f)
                getList(f);
                if (props.id) props.api(`/${modelName}/${props.id}/view`).then(setModel)
            })

    }, [props.id, modelName]);

    function getList(f) {
        setFilter(f)
        props.api(`/${modelName}/list`, f).then(res => {
            setList(res.list)
            setTotalCount(res.count)
        })
    }

    function create() {
        props.api(`/admin/${modelName}/create`)
            .then(model => {
                navigate(model.adminLink)
            })
    }

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);

        const err = {};
        for (const f of schema.fields) {
            console.log(f)
            if (f.options.required && !form[f.name]) err[f.name] = f.options.label + ' обязательно';
        }
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            console.log(form)
            props.api(`/admin/${modelName}/${model.id}/update`, form)
                .then(() => {
                    getList(filter);
                    setEdited(false)
                })
        } else {
            create(form)
        }

    }

    function uploadDone(files) {
        props.api(`/admin/${modelName}/${model.id}/files/add`, {files})
            .then(setModel)
    }

    function setPreview(img) {
        props.api(`/admin/${modelName}/${model.id}/file-preview/${img.id}`)
            .then(setModel)
    }


    function pageChange(f) {
        getList(f)
    }

    function search(e) {
        e.preventDefault()
        const form = props.formToObject(e.target);
        const f = {...filter}
        f.regexp = schema.formOptions.searchFields.map(p=>{
                    const o = {};
                    o[p] = form.search
                    return o
                })
        getList(f)
    }

    function deleteModel() {
        if(!window.confirm(`Удалить ${schema.formOptions.label}?`)) return;
        props.api(`/admin/${modelName}/${model.id}/delete`).then(()=> {
            setModel(null)
            getList(filter)
        })
    }

    if (!schema) return <div></div>;
    return <div key={modelName}>
        {!model && <div>
            <Button onClick={create} color="primary">Добавить {schema.formOptions.label}</Button>
            <form  onSubmit={search}>
                <input name="search"/>
                <Button>Поиск</Button>
                <Button type="cancel">Х</Button>
            </form>
            <table className="table table-striped">
                <tbody>
                {list.map(l => <tr key={l.id}>
                    <td>
                        <A key={l.id} href={`/admin/${modelName}/${l.id}/update`} className={`d-block ${model && l.id === model.id ? 'bg-success' : ''}`}>
                            {schema.formOptions.listFields.map(f => l[f]).join(' - ') || l.id}</A>
                    </td>
                    <td>
                        {l.image && <img src={l.photo} alt={l.id} height={20}/>}
                    </td>
                </tr>)}
                </tbody>
            </table>

            Найдено: {totalCount}
            {!!totalCount && <Pager key={totalCount} count={totalCount} filter={filter} onPageChange={pageChange}/>}
        </div>}
        {model && <div>

            <Button onClick={()=>navigate(`/admin/${modelName}`)} color="warning">Закрыть</Button>
            <A href={model.link}>Смотреть</A>
            <div className="row">
                <div className="col-10">
                    <form onSubmit={submit} key={model.id} onChange={() => setEdited(true)} className="form-model">
                        {edited && <Button>Сохранить</Button>}
                        <div className="admin-form-fields">
                            {schema.fields.map(f => <InputModel key={f.name} modelName={modelName} model={model} field={f} errors={errors} {...props}/>)}
                        </div>
                        {edited && <Button>Сохранить</Button>}
                    </form>

                </div>
                <div className="col-2">
                    <img src={model.photoPath} alt={model.id} className="img-fluid"/>
                    <FileUpload uploadDone={uploadDone} {...props}/>
                    {model.files && <FileList
                        key={model.files.length}
                        setPreview={setPreview}
                        files={model.files.filter(i => i.isImage)}
                        editable={true}
                        {...props}/>}
                </div>

            </div>

            <Button onClick={deleteModel} color="danger">Удалить</Button>
        </div>}

    </div>
}
