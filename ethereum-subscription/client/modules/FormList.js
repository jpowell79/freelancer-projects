import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {isDefined} from '../../services/strings';
import {classNames} from "../services/className";
import {Message} from 'semantic-ui-react';

const specialInputTypes = [
    'date', 'datetime-local', 'email', 'hidden', 'month',
    'number', 'password', 'tel', 'time', 'url', 'week'
];

class FormList extends Component {
    static defaultProps = {
        className: "",
        disabled: false,
        errorTitle: "There was some errors with your submission"
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        errorTitle: PropTypes.string,
        submitButtonHtml: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]).isRequired,
        disabled: PropTypes.bool,
        fields: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            error: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]).isRequired,
            label: PropTypes.string
        }))
    };

    constructor(props){
        super(props);

        this.state = props.fields
            .map(field => ({[field.type]: ''}))
            .reduce((accumulator, currentValue) => {
                return Object.assign({}, accumulator, currentValue);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    renderFields = () => {
        return this.props.fields.map((field, i) => {
            if(field.type === 'hidden') return null;

            const fieldClass = classNames({
                'field': true,
                'error': typeof error === 'string' ? isDefined(field.error) : field.error
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
        const errors = this.props.fields
            .map(field => field.error)
            .filter(error => typeof error === 'string')
            .filter(error => isDefined(error));

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
                        list={errors.filter(error => typeof error === 'string')}
                    />
                )}
                <form className="ui form">
                    {this.renderFields()}
                    {children}
                    <button
                        disabled={this.props.disabled}
                        ref={button => {this.submitButton = button;}}
                        className="ui primary button"
                        onClick={this.handleSubmit}>{this.props.submitButtonHtml}</button>
                </form>
            </Fragment>
        );
    }
}

export default FormList;