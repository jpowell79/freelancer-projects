import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {joinClassNames} from "../services/className";

class FileInput extends Component {
    static defaultProps = {
        label: null,
        buttonContent: "Upload",
        placeholder: ""
    };
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        buttonContent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        onFileUploaded: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            fileName: ""
        }
    }

    render(){
        const {
            label,
            onFileUploaded,
            buttonContent,
            placeholder,
            className,
            ...props
        } = this.props;

        return (
            <Fragment>
                {(label) && (
                    <label>{label}</label>
                )}
                <div {...props} className={joinClassNames("file-input", className)}>
                    <label>
                        <button
                            className="ui icon left primary submit button"
                            onClick={() => {
                                this.fileInput.click();
                            }}>
                            {buttonContent}
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={this.state.fileName}
                            placeholder={placeholder}
                        />
                    </label>
                    <input
                        type="file"
                        ref={(input) => {this.fileInput = input}}
                        onChange={(event) => {
                            const file = event.target.files["0"];
                            this.setState({fileName: file.name});
                            onFileUploaded(file);
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}

export default FileInput;