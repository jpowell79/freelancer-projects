import React, {Component} from 'react';
import Settings from '../../../../site-settings';
import PropTypes from 'prop-types';
import {joinClassNames} from "../../../../services/utils/index";
import $ from "jquery";

class RecaptchaWidget extends Component {
    static defaultProps = {
        id: '',
        className: '',
        theme: 'light',
        size: 'normal'
    };

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        theme: PropTypes.oneOf(['light', 'dark']),
        size: PropTypes.oneOf(['compact', 'normal'])
    };

    componentDidMount(){
        if($('#google-recaptcha-script').length === 0){
            $('body').append(
                `<script
                    id="google-recaptcha-script"
                    src='https://www.google.com/recaptcha/api.js'></script>`
            );
        }
    }

    componentWillUnmount(){
        const $googleRecaptchaScript = $('#google-recaptcha-script');

        if($googleRecaptchaScript.length > 0) {
            $googleRecaptchaScript.remove();
        }
    }

    render(){
        const {
            id,
            className,
            theme,
            size
        } = this.props;

        return (
            <div
                id={id}
                className={joinClassNames("g-recaptcha", className)}
                data-sitekey={Settings.RECAPTCHA_SITE_KEY}
                data-theme={theme}
                data-size={size}
            />
        );
    }
}

export default RecaptchaWidget;