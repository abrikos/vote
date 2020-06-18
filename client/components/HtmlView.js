import React from "react";
import PropTypes from "prop-types";
HtmlView.propTypes = {
    text: PropTypes.string,
};

export default function HtmlView(props) {
    //return <span dangerouslySetInnerHTML={{__html: (props.text && props.text.replace('\n', '<br/>'))}}></span>
    return <span dangerouslySetInnerHTML={{__html: props.text}}></span>
}
