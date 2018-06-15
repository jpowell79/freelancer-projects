import React from 'react';
import AlertOptionPane from '../../../components/Alert/AlertOptionPane';
import $ from 'jquery';

describe('Rendering tests', () => {
    it('should render error alert', () => {
        AlertOptionPane.showErrorAlert({});
        expect($(".error-alert").length).toBe(1);
    });

    it('should render warning alert', () => {
        AlertOptionPane.showWarningAlert({});
        expect($(".warning-alert").length).toBe(1);
    });

    it('should render information alert', () => {
        AlertOptionPane.showInfoAlert({});
        expect($(".info-alert").length).toBe(1);
    });

    it('should render success alert', () => {
        AlertOptionPane.showSuccessAlert({});
        expect($(".success-alert").length).toBe(1);
    });

    it('should render plain alert', () => {
        AlertOptionPane.showPlainAlert({});
        expect($(".plain-alert").length).toBe(1);
    });
});