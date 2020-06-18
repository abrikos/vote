import React, {useState} from "react";
import FileList from "client/components/file-list/FileList";
import Loader from "client/components/Loader";
import PropTypes from "prop-types";

FileUpload.propTypes = {
    uploadDone: PropTypes.func.isRequired
};

export default function FileUpload(props) {
    //const [filesUploaded, setImagesUploaded] = useState([]);
    const [filesDeclined, setImagesDeclined] = useState([]);
    const [loader, setLoader] = useState(false);
    const tokens = props.tokens;

    async function _handleImageChange(e) {
        setLoader(true)
        e.preventDefault();
        const uploaded = [];
        const declined = [];
        for (const file of e.target.files) {
            /*let reader = new FileReader();
            reader.onloadend = () => {

                console.log(1,items)
                items.push(reader.result);
                //setImagesUploaded(ims);
            };*/
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tokens', tokens);
            try {
                const image = await props.api('/file/upload/', formData);
                uploaded.push(image);
            } catch (e) {
                declined.push({error: e.message, file})
                //reader.readAsDataURL(file);
            }

        }
        if (uploaded.length && props.uploadDone) props.uploadDone(uploaded.map(i => i.id))
        //setImagesUploaded(uploaded);
        setImagesDeclined(declined);
        setLoader(false)
    }

    return <div>
        {loader ? <Loader/> : <input type="file" multiple={true} onChange={_handleImageChange}/>}
        {/*{!!filesUploaded.length && <div>
            <h4>Загружено</h4>
            <ImageList files={filesUploaded} editable={props.editable} {...props}/>
        </div>}*/}

        {!!filesDeclined.length && <div>
            <h4>Отказано</h4>
            <FileList files={filesDeclined} {...props}/>
        </div>}

    </div>

}

