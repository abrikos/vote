import React, {useEffect, useState} from "react";
import "./markdown.sass"
import MarkDown from "react-markdown";
import PropTypes from "prop-types";
import {Input} from "reactstrap";
import {ModalDialog} from "client/components/ModalDialog";

MarkdownEditor.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    invalid: PropTypes.bool,
};


export default function MarkdownEditor(props) {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    function handleChange(e) {

        setValue(e.target.value)
        if (props.onChange) props.onChange(e)
    }

    return <>
        <Input name={props.name} defaultValue={value} invalid={props.invalid} type="textarea" rows={3} onChange={handleChange}/>
        <div className="text-right">
        <ModalDialog
            body={<MarkDown source={value}/>}
            //open={true}
            header="Форматированный текст"
            //controls={[<Button onClick={submit} color="primary">Отправить</Button>, <Button onClick={clear} color="warning">Отменить</Button>]}
            buttonText="Предпросмотр"/>
        </div>

    </>

}
