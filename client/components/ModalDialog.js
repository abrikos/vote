import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import PropTypes from "prop-types";
ModalDialog.propTypes = {
    body: PropTypes.object,
    header: PropTypes.string,
    buttonText: PropTypes.string,
    open: PropTypes.bool,
    controls: PropTypes.array,
};

export function ModalDialog(props) {
    const [modal, setModal] = useState(props.open);
    const toggle = () => setModal(!modal);

    return <div>
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
            <ModalHeader toggle={toggle}>{props.header}</ModalHeader>
            <ModalBody>
                {props.body}
            </ModalBody>
            <ModalFooter>
                {props.controls && props.controls.map((c,i)=><span key={i}>{c}</span>)}
                <Button color="secondary" onClick={toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
        <Button onClick={toggle}>{props.buttonText}</Button>
    </div>

}
