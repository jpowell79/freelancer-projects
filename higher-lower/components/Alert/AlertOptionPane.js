import React from "react";
import Alert from "./Alert";

class AlertOptionPane {
    static showErrorAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = "Error",
        titleIcon = <i className="fas fa-exclamation-circle"/>,
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        return new Alert({
            type: Alert.TYPES.ERROR,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: titleIcon,
            confirmText: confirmText,
            cancelText: cancelText,
            className: className,
            callbacks: {
                onClose: onClose,
                onConfirm: onConfirm,
                onCancel: onCancel
            }
        }).show();
    };

    static showWarningAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = "Warning",
        titleIcon = <i className="fas fa-exclamation-circle"/>,
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        return new Alert({
            type: Alert.TYPES.WARNING,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: titleIcon,
            confirmText: confirmText,
            cancelText: cancelText,
            className: className,
            callbacks: {
                onClose: onClose,
                onConfirm: onConfirm,
                onCancel: onCancel
            }
        }).show();
    };

    static showInfoAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = "Information",
        titleIcon = <i className="fas fa-info-circle"/>,
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        return new Alert({
            type: Alert.TYPES.INFO,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: titleIcon,
            confirmText: confirmText,
            cancelText: cancelText,
            className: className,
            callbacks: {
                onClose: onClose,
                onConfirm: onConfirm,
                onCancel: onCancel
            }
        }).show();
    };

    static showSuccessAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = "Success",
        titleIcon = <i className="fas fa-check-circle"/>,
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        return new Alert({
            type: Alert.TYPES.SUCCESS,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: titleIcon,
            confirmText: confirmText,
            cancelText: cancelText,
            className: className,
            callbacks: {
                onClose: onClose,
                onConfirm: onConfirm,
                onCancel: onCancel
            }
        }).show();
    };

    static showPlainAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = Alert.DEFAULT_TEXT.TITLE,
        htmlMessage = undefined,
        titleIcon = null,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        return new Alert({
            type: Alert.TYPES.PLAIN,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: titleIcon,
            confirmText: confirmText,
            cancelText: cancelText,
            className: className,
            callbacks: {
                onClose: onClose,
                onConfirm: onConfirm,
                onCancel: onCancel
            }
        }).show();
    };
}

export default AlertOptionPane;