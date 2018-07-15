import React from 'react';
import Countdown from 'react-countdown-now';

export const TokenCountdown = ({title, date, onCountdownZero}) => {
    const countdownRenderer = ({days, hours, minutes, seconds}) => {
        return (
            <div className="ui large statistics">
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
    };

    return (
        <div className="text-center">
            <h2 className="display-4 lighter">{title}</h2>
            <div className="content" style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Countdown
                    date={date}
                    onComplete={onCountdownZero}
                    renderer={countdownRenderer}
                />,
            </div>
        </div>
    );
};