import React, {useState} from "react";
import JoditEditor from "jodit-react";

import PropTypes from "prop-types";

HtmlEditor.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.object,
};

export default function HtmlEditor(props) {
    const [value, setValue] = useState(props.value);
    const options = {...props.options}

    function handleChange(text) {
        console.log(text)
        setValue(text)
        //if(props.onChange) props.onChange(text)
    }


    return <div>

        <textarea name={props.name} value={value} readOnly hidden style={{width: '100%', height: options.height}}/>
        <JoditEditor
            //ref={editor}
            value={value}
            config={options}
            tabIndex={1} // tabIndex of textarea
            onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
            onChange={props.onChange}
        />
    </div>
}
