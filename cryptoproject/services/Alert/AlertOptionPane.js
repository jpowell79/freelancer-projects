import React from 'react';
import Alert from './Alert';
import {ExclamationCircle, InfoCircle, CheckCircle} from "../../components/modules/icons/index";

class AlertOptionPane {
    static showErrorAlert = ({
        message = Alert.DEFAULT_TEXT.MESSAGE,
        title = 'Error',
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        new Alert({
            type: Alert.TYPES.ERROR,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: <ExclamationCircle/>,
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
        title = 'Warning',
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        new Alert({
            type: Alert.TYPES.WARNING,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: <ExclamationCircle/>,
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
        title = 'Information',
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        new Alert({
            type: Alert.TYPES.INFO,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: <InfoCircle/>,
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
        title = 'Success',
        htmlMessage = undefined,
        confirmText = Alert.DEFAULT_TEXT.CONFIRM,
        cancelText = Alert.DEFAULT_TEXT.CANCEL,
        className = "",
        onClose = undefined,
        onConfirm = undefined,
        onCancel = undefined
    }) => {
        new Alert({
            type: Alert.TYPES.SUCCESS,
            message: message,
            htmlMessage: htmlMessage,
            title: title,
            titleIcon: <CheckCircle/>,
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
        new Alert({
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