import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import PropTypes from "prop-types";
import HideFragment from '../../../modules/HideFragment';

class CryptoCountdown extends Component {
    static defaultProps = {
        standardTimeRenderer: CryptoCountdown.renderStandardTimeCountdown,
        extendedTimeRenderer: CryptoCountdown.renderExtendedTimeCountdown,
        className: ''
    };

    static propTypes = {
        standardTimeCloses: PropTypes.number.isRequired,
        extendedTimeCloses: PropTypes.number.isRequired,
        onStandardTimeZero: PropTypes.func.isRequired,
        onExtendedTimeZero: PropTypes.func.isRequired,
        standardTimeRenderer: PropTypes.func,
        extendedTimeRenderer: PropTypes.func
    };

    static countdownRenderer({days, hours, minutes, seconds}){
        return (
            <div className="ui statistics">
                <div className="statistic">
                    <div className="value">{days}</div>
                    <div className="label">Days</div>
                </div>
                <div className="statistic">
                    <div className="value">{hours}</div>
                    <div className="label">Hours</div>
                </div>
                <div className="statistic">
                    <div className="value">{minutes}</div>
                    <div className="label">Minutes</div>
                </div>
                <div className="statistic">
                    <div className="value">{seconds}</div>
                    <div className="label">Seconds</div>
                </div>
            </div>
        );
    }

    static renderStandardTimeCountdown(countdown, title){
        return (
            <div className="text-center">
                <h2 className="ui header">{title}</h2>
                <div className="content" style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    {countdown}
                </div>
            </div>
        );
    }

    static renderExtendedTimeCountdown(countdown, title){
        return (
            <div className="text-center">
                <h2 className="ui header">{title}</h2>
                <div className="content" style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    {countdown}
                </div>
            </div>
        );
    }

    render(){
        return (
            <HideFragment>
                <div id="crypto-countdown" className={this.props.className}>
                    {this.props.standardTimeRenderer(
                        <Countdown
                            date={this.props.standardTimeCloses}
                            onComplete={this.props.onStandardTimeZero}
                            renderer={CryptoCountdown.countdownRenderer}
                        />,
                        'Standard trade time closes in'
                    )}
                    {this.props.extendedTimeRenderer(
                        <Countdown
                            date={this.props.extendedTimeCloses}
                            onComplete={this.props.onExtendedTimeZero}
                            renderer={CryptoCountdown.countdownRenderer}
                        />,
                        'Extended trade time closes in'
                    )}
                </div>
            </HideFragment>
        );
    }
}

export default CryptoCountdown;