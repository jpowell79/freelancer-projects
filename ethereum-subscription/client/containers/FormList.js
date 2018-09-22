import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {isDefined} from "../../services/datatypes/strings";
import {classNames} from "../services/className";
import {Message} from "semantic-ui-react";
import validation from "../../services/validation";
import objects from "../../services/datatypes/objects";

const specialInputTypes = [
    "date", "datetime-local", "email", "hidden", "month",
    "number", "password", "tel", "time", "url", "week"
];

class FormList extends Component {
    static defaultProps = {
        className: "",
        disabled: false,
        errorTitle: "There was some errors with your submission",
        onError: null,
        validate: true
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onError: PropTypes.func,
        errorTitle: PropTypes.string,
        validate: PropTypes.bool,
        submitButtonHtml: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]).isRequired,
        buttonChildren: PropTypes.element,
        disabled: PropTypes.bool,
        fields: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            defaultValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            error: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            label: PropTypes.string,
            excludeFromValidation: PropTypes.bool,
        }))
    };

    constructor(props){
        super(props);

        this.state = props.fields
            .map(field => ({[field.type]: (field.defaultValue) ? field.defaultValue : ""}))
            .reduce((accumulator, currentValue) => Object.assign({}, accumulator, currentValue));

        this.fieldErrors = {};
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.fieldErrors = {};
        const fieldErrorsArray = Object.keys(this.state)
            .filter(fieldKey => !this.props.fields
                .find(field => field.type === fieldKey)
                .excludeFromValidation)
            .filter(fieldKey => isDefined(validation.getFieldError(fieldKey, this.state[fieldKey])))
            .map(fieldKey => ({[fieldKey]: validation.getFieldError(fieldKey, this.state[fieldKey])}));

        if(fieldErrorsArray.length === 0 || !this.props.validate){
            this.props.onSubmit(this.state);
        } else {
            this.fieldErrors = fieldErrorsArray.reduce((accumulator, currentValue) =>
                Object.assign({}, accumulator, currentValue)
            );

            if(this.props.onError){
                this.props.onError(this.fieldErrors);
            } else {
                this.forceUpdate();
            }
        }
    };

    renderFields = () => {
        return this.props.fields.map((field, i) => {
            if(field.hidden) return null;

            const fieldClass = classNames({
                "field": true,
                "error": ((typeof field.error === "string")
                    ? (isDefined(field.error))
                    : field.error) || isDefined(this.fieldErrors[field.type])
            }, this.props.className);

            const specialType = specialInputTypes.filter(type => type === field.type)[0];
            const type = (specialType) ? specialType : "text";

            return (
                <div className={fieldClass} key={i}>
                    <label>{(field.label) ? field.label : field.type}</label>
                    <input
                        type={type}
                        disabled={this.props.disabled}
                        value={this.state[field.type]}
                        onKeyDown={event => {
                            if(event.key === "enter"){
                                this.submitButton.click();
                            }
                        }}
                        onChange={event => {
                            this.setState({[field.type]: event.target.value});
                        }}
                    />
                </div>
            );
        });
    };

    render(){
        let errors = this.props.fields
            .map(field => field.error)
            .filter(error => typeof error === "string")
            .filter(error => isDefined(error));
        errors = (objects.isEmpty(this.fieldErrors) || errors.length > 0)
            ? errors : objects.values(this.fieldErrors);

        const children = (this.props.children && this.props.children.length)
            ? (
                this.props.children.map((child, i) => (
                    <div className="field" key={i}>{child}</div>
                ))
            ) : (
                <div className="field">{this.props.children}</div>
            );

        return (
            <Fragment>
                {(errors.length > 0) && (
                    <Message
                        error
                        header={this.props.errorTitle}
                        list={errors}
                    />
                )}
                <form className="ui form">
                    {this.renderFields()}
                    {children}
                    <hr className="ui divider"/>
                    <button
                        disabled={this.props.disabled}
                        ref={button => {this.submitButton = button;}}
                        className="ui primary button"
                        onClick={this.handleSubmit}>{this.props.submitButtonHtml}</button>
                    {this.props.buttonChildren}
                </form>
            </Fragment>
        );
    }
}

export default FormList;