import React from "react";
import classNames from "classnames";
import Flipper from "./Flipper/index";
import schema from "./schema.js";

class Countdown extends React.Component {
    constructor(props){
        super(props);

        /**
         * @type {object}
         * @property {object} diff - initial diff object
         */
        this.state = {
            diff: this.getDiffObject()
        };
    }

    /**
     * Create second interval
     */
    componentDidMount(){
        this.interval = setInterval(() =>{
            this.setState({diff: this.getDiffObject()});
            this.isTimeOver() && this.stopCount();

            if(this.isTimeToNotify()){
                this.notify();
            }

            this.isTimeOver() && this.stopCount();
        }, 1000);
    }

    notify(){
        if(!this.props.hasNotified){
            this.props.notify();
        }
    }

    /**
     * Clears interval and drop notification
     */
    stopCount(){
        if(!this.props.isStopped){
            this.props.onStop && this.props.onStop();
        }
    }

    /**
     * Destroy second interval
     */
    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval);
        }
    }

    /**
     * Calculate diff object between stop and current date
     * @return {Object} formatted value
     */
    getDiffObject(){
        let ms = Math.abs(this.props.stop.getTime() - (new Date()).getTime()),
            s = Math.floor(ms / 1000),
            m = Math.floor(s / 60),
            h = Math.floor(m / 60),
            d = Math.floor(h / 24);

        return {
            minutes: m % 60,
            seconds: s % 60
        };
    }

    isTimeToNotify(){
        if(!this.props.notifyAt) return false;

        return (new Date()).getTime() + this.props.notifyAt > this.props.stop.getTime();
    }

    /**
     * Return flag stop date reached
     * @return {Boolean}
     */
    isTimeOver(){
        return (new Date()).getTime() > this.props.stop.getTime();
    }

    /**
     * Returns formated to 2 digits string
     * @param {Number} data - raw value
     * @return {String} formatted value
     */
    getFormattedVal(data){
        return (data < 10 ? "0" + data : data) + "";
    }

    /**
     * Render Flipper component for each digit of diff object vals
     * @return {ReactElement} markup
     */
    render(){
        let forks = {
                hours: [[0, 2], [0, 4]],
                minutes: [[0, 5], [0, 9]],
                seconds: [[0, 5], [0, 9]]
            },
            isOver = this.isTimeOver();

        return (
            <div className={classNames("countdown", this.props.className)}>
                {Object.keys(this.state.diff).map(key => <div
                    key={key}
                    className={classNames(`countdown-${key}`, this.props.slotClassName)}>
                    {Array(2).fill(0).map((_, i) => <Flipper
                        key={`${key}${i}`}
                        reverse
                        className={this.props.cardsClassName}
                        cardClassName={this.props.cardClassName}
                        sidesWrapClassName={this.props.sidesWrapClassName}
                        sideClassName={this.props.sideClassName}
                        numClassName={this.props.numClassName}
                        now={!isOver ? +this.getFormattedVal(this.state.diff[key])[i] : 0}
                        min={forks[key][i][0]}
                        max={forks[key][i][1]}/>)}
                </div>)}
            </div>
        );
    }
};

Countdown.propTypes = schema.types;

Countdown.defaultProps = schema.defaults;

export default Countdown;
