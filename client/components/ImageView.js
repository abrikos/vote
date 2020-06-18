import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import React, {useState} from "react";

export default function ImageView(props) {
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState();
    const toggle = () => setModal(!modal);

    function showImage(src) {
        setModalImage(src);
        toggle();
    }

    return <div>
        <img {...props} onClick={()=>showImage(props.src)}/>
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <img src={modalImage} alt={'Full'} className="img-fluid"/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    </div>

}
