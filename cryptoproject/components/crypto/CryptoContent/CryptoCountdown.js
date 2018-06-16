import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import PropTypes from "prop-types";

class CryptoCountdown extends Component {
    static propTypes = {
        standardTimeCloses: PropTypes.number.isRequired,
        extendedTimeCloses: PropTypes.number.isRequired,
        onStandardTimeZero: PropTypes.func.isRequired,
        onExtendedTimeZero: PropTypes.func.isRequired
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

    render(){
        return (
            <div>
                <h2 className="ui dividing header">Standard trade time closes:</h2>
                <div className="content">
                    <Countdown
                        date={this.props.standardTimeCloses*1000}
                        onComplete={this.props.onStandardTimeZero}
                        renderer={CryptoCountdown.countdownRenderer}
                    />
                </div>
                <h2 className="ui dividing header">Extended trade time closes:</h2>
                <div className="content">
                    <Countdown
                        date={this.props.extendedTimeCloses*1000}
                        onComplete={this.props.onExtendedTimeZero}
                        renderer={CryptoCountdown.countdownRenderer}
                    />
                </div>
            </div>
        );
    }
}

export default CryptoCountdown;