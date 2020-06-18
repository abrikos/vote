import React, {useState} from "react";
import "client/components/file-list/file-list.sass";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";

FileList.propTypes = {
    files: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    controls: PropTypes.array,
    onDelete: PropTypes.func,
};


export default function FileList(props) {
    const [deleted, setDeleted] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState();
    const toggle = () => setModal(!modal);

    function deleteImage(img) {
        if (!window.confirm('Удалить изображение?')) return;
        props.api('/file/delete/' + img.id)
            .then(() => {
                const del = [...deleted];
                del.push(img.id);
                setDeleted(del);
                if (props.onDelete) props.onDelete()
            })
    }


    function showImage(img) {
        setModalImage(img.path);
        toggle();
    }


    if (!props.files) return <div/>;
    return <div className="image-list">
        {props.files.filter(img => !deleted.includes(img.id)).map((img, i) => <div key={i} className="image-cell">
            {props.editable && img.id && <div className="img-tools">
                {props.controls}
                {props.setPreview && <Button size="sm" color="success" onClick={() => props.setPreview(img)}>👁</Button>}
                {<Button size="sm" color="danger" onClick={() => deleteImage(img)}>🗑</Button>}

            </div>}
            <div className="img-container">
                {img.error ?
                    <small>
                        <div className="error">{img.error}</div>
                        <strong>{img.file.name}</strong> <br/> <small className="error">{(img.file.size / 1024 / 1024).toFixed(1)} Mb</small> </small>
                    :
                    <img src={img.path || img} alt={img.path} onClick={() => showImage(img)}/>}
                {/*{props.editable && img.id && <input value={img.order} onChange={setOrder} type="number"/>}*/}
                    </div>
        </div>)}
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <img src={modalImage} alt={'Full'} className="full-image"/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    </div>

}
