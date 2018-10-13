import React from "react";
import ReactDom from "react-dom";
import ReactDomServer from "react-dom/server";
import AlertContent from "./AlertContent";
import $ from "jquery";

class Alert {
    static TYPES = {
        PLAIN: "plain",
        ERROR: "error",
        WARNING: "warning",
        INFO: "info",
        SUCCESS: "success"
    };

    static DEFAULT_TEXT = {
        TITLE: "",
        CONFIRM: "Ok",
        MESSAGE: "",
        CANCEL: "Cancel"
    };

    static CLASS_NAMES = {
        ROOT_CONTAINER: "alert",
        ALERT_RENDERED: "alert-rendered",
        SCROLLBAR_FILLER: "alert-scrollbar-filler"
    };

    static id = 0;

    constructor({
        type = Alert.TYPES.PLAIN,
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = Alert.DEFAULT_TEXT.TITLE,
        htmlMessage = undefined,
        titleIcon = null,
        closeIcon = <i className="fas fa-times"/>,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        callbacks = {
            onCancel: undefined,
            onConfirm: undefined,
            onClose: undefined
        }
    }) {
        Alert.id += 1;
        this.id = Alert.id;
        this.type = type;
        this.title = title;
        this.message = (htmlMessage !== undefined) ? htmlMessage : <p>{message}</p>;
        this.titleIcon = titleIcon;
        this.closeIcon = closeIcon;
        this.confirmText = confirmText;
        this.onClose = callbacks.onClose;
        this.onConfirm = callbacks.onConfirm;
        this.showCancel = (callbacks.onCancel !== undefined);
        this.onCancel = callbacks.onCancel;
        this.className = className;
        this.cancelText = cancelText;
        this.selectors = {
            id: `${this.type}-alert-${this.id}`,
            alertType: `${this.type}-alert`,
            cancelButton: `${this.type}-cancel-${this.id}`,
            confirmButton: `${this.type}-confirm-${this.id}`,
            closeButton: `${this.type}-close-${this.id}`
        };

        this.show = this.show.bind(this);
        this.remove = this.remove.bind(this);
    }

    show() {
        let {
            id,
            alertType,
            confirmButton,
            cancelButton,
            closeButton
        } = this.selectors;
        let {
            ROOT_CONTAINER,
            ALERT_RENDERED,
            SCROLLBAR_FILLER
        } = Alert.CLASS_NAMES;

        let alertRoot = ReactDomServer.renderToStaticMarkup(
            <div id={id} className={`${ROOT_CONTAINER} ${alertType} ${this.className}`} />
        );
        let $body = $("body");
        $body.append(alertRoot);
        if(!$body.hasClass(ALERT_RENDERED)){
            $body.addClass(ALERT_RENDERED);
            if($(document).height() > $(window).height()){
                $body.addClass(SCROLLBAR_FILLER);
            }
        }

        $("html, body").animate({ scrollTop: 0 }, 0);

        ReactDom.render(
            <AlertContent
                closeIcon={this.closeIcon}
                titleIcon={this.titleIcon}
                title={this.title}
                cancelText={this.cancelText}
                confirmText={this.confirmText}
                cancelButtonId={cancelButton}
                confirmButtonId={confirmButton}
                closeButtonId={closeButton}
                message={this.message}
                showCancel={this.showCancel}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                onClose={this.onClose}
                remove={this.remove}/>,
            $(`#${id}`)[0]
        );

        return this;
    }

    remove(){
        let $id = $(`#${this.selectors.id}`);
        ReactDom.unmountComponentAtNode($id[0]);
        $id.remove();
        Alert.id -= 1;
        if(Alert.id === 0){
            let $body = $("body");
            $body.removeClass(Alert.CLASS_NAMES.ALERT_RENDERED);
            $body.removeClass(Alert.CLASS_NAMES.SCROLLBAR_FILLER);
        }
    }
}

export default Alert;