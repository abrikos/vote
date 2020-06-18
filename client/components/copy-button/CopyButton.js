import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {Popover, PopoverHeader} from "reactstrap";
import md5 from 'md5';

export default function CopyButton(props) {
    const [showPopOver, setShowPopOver] = useState(false)

    const copyToClipboard = (text) => {
        setShowPopOver( true);
        const textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select();
        document.execCommand('copy')
        textField.remove();
        setTimeout(() => {
            setShowPopOver(false);
        }, 2000);
    }

    const id='cpbtn'+md5(props.text)
    return <span style={{cursor: 'pointer', color: '#555'}} id={id} onClick={e => copyToClipboard(props.text)} title={`Press to copy: ${props.text}`}>
            <FontAwesomeIcon size="sm" icon={faCopy}/> Копировать
            <Popover placement={'right'}
                     isOpen={showPopOver}
                     target={id}>
          <PopoverHeader>Скопировано</PopoverHeader>
        </Popover>
        </span>
}
