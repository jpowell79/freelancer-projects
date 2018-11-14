import React, {Component} from "react";
import PropTypes from "prop-types";

class AlertContent extends Component {
    static CLASS_NAMES = {
        BACKDROP: "alert-backdrop",
        VISIBLE: "alert-visible",
        HIDDEN: "alert-hidden",
        MAIN_CONTAINER: "alert-main",
        CONTENT_CONTAINER: "alert-content",
        HEADER: "alert-header",
        TITLE: "alert-title",
        BUTTON_CONTAINER: "alert-buttons"
    };

    static ANIMATION_TIME = 300;

    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            disabled: false
        };

        this.renderContent = this.renderContent.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState(() => {
                return { hidden: false }
            }
        )}, AlertContent.ANIMATION_TIME);
    }

    disableAlert = async () => {
        return new Promise(resolve => {
            this.setState({disabled: true}, () => resolve());
        });
    };

    removeAlert(){
        new Promise(resolve => {
            this.setState(() => {
                return {hidden: true}
            });

            setTimeout(() => {
                resolve();
            }, AlertContent.ANIMATION_TIME);
        }).then(() => {
            this.props.remove();
        });
    }

    renderContent(revealClass = ""){
        let {
            MAIN_CONTAINER,
            BACKDROP,
            CONTENT_CONTAINER,
            HEADER,
            TITLE,
            BUTTON_CONTAINER
        } = AlertContent.CLASS_NAMES;

        let {
            closeIcon,
            titleIcon,
            title,
            message,
            cancelText,
            confirmText,
            cancelButtonId,
            confirmButtonId,
            closeButtonId,
            showCancel,
            onCancel,
            onConfirm,
            onClose
        } = this.props;

        return (
            <div className={`${BACKDROP} ${revealClass}`}>
                <div className={`${MAIN_CONTAINER} ${revealClass}`}>
                    <div className={`${HEADER}`}>
                        <div>
                            {titleIcon}
                            <h3 className={`${TITLE}`}>{title}</h3>
                        </div>
                        {(!this.state.disabled) && (
                            <div
                                id={closeButtonId}
                                className="close"
                                onClick={(event) => {
                                    (onClose !== undefined)
                                        ? onClose(event, this.removeAlert)
                                        : this.removeAlert();
                                }}>{closeIcon}</div>
                        )}
                    </div>
                    <div className={`${CONTENT_CONTAINER}`}>
                        {message}
                    </div>
                    <div className={`${BUTTON_CONTAINER}`}>
                        {(showCancel)
                            ? <button
                                id={cancelButtonId}
                                className="button secondary"
                                disabled={this.state.disabled}
                                onClick={(event) => {
                                    (onCancel !== undefined)
                                        ? onCancel(event, this.removeAlert, this.disableAlert)
                                        : this.removeAlert();
                                }}>{cancelText}</button>
                            : null}
                        <button
                            id={confirmButtonId}
                            className="button secondary"
                            autoFocus
                            disabled={this.state.disabled}
                            onClick={(event) => {
                                (onConfirm !== undefined)
                                    ? onConfirm(event, this.removeAlert, this.disableAlert)
                                    : this.removeAlert();
                            }}
                        >
                            {(this.state.disabled)
                                ? <div className="loader-tiny"/>
                                : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (this.state.hidden)
            ? this.renderContent(AlertContent.CLASS_NAMES.HIDDEN)
            : this.renderContent(AlertContent.CLASS_NAMES.VISIBLE);
    }
}

AlertContent.propTypes = {
    closeIcon: PropTypes.element,
    titleIcon: PropTypes.element,
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelButtonId: PropTypes.string,
    confirmButtonId: PropTypes.string,
    closeButtonId: PropTypes.string,
    onCancel: PropTypes.func,
    showCancel: PropTypes.bool,
    animationTime: PropTypes.number,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    message: PropTypes.element.isRequired,
    remove: PropTypes.func.isRequired
};

AlertContent.defaultProps = {
    closeIcon: null,
    titleIcon: null,
    title: "",
    cancelText: "",
    confirmText: "",
    cancelButtonId: "",
    confirmButtonId: "",
    closeButtonId: "",
    showCancel: false
};

export default AlertContent;