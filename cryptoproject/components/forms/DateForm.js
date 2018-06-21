import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class DateForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        submitText: PropTypes.string.isRequired
    };

    state = {
        startDate: moment(),
        endDate: moment()
    };

    render(){
        return (
            <div className="date-form text-center">
                <div className="ui padded stackable centered grid two-column">
                    <div className="eight wide column text-center">
                        <h4>From Date:</h4>
                        <DatePicker
                            inline
                            locale="en-gb"
                            selected={this.state.startDate}
                            startDate={this.state.endDate}
                            onChange={(date) => {this.setState({startDate: date})}}
                        />
                    </div>
                    <div className="eight wide column text-center">
                        <h4>To Date:</h4>
                        <DatePicker
                            inline
                            locale="en-gb"
                            selected={this.state.endDate}
                            startDate={this.state.endDate}
                            onChange={(date) => {this.setState({endDate: date})}}
                        />
                    </div>
                </div>
                <button
                    className="ui button primary"
                    onClick={() => {
                        this.props.onSubmit(
                            this.state.startDate,
                            this.state.endDate
                        );
                    }}>{this.props.submitText}</button>
            </div>
        );
    }
}

export default DateForm;