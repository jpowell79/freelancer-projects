import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TickerTape extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    render(){
        const {
            items
        } = this.props;

        return (
            <div className="ticker-tape" style={{
                animationDuration: `${(items.length)}s`,
                width: `${items.length*100}px`
            }}>
                <span>
                    {items.map((item, i) => {
                        return (
                            <div key={i} className="ticker-tape-item">
                                {item}
                            </div>
                        );
                    })}
                </span>
                <span>
                    {items.map((item, i) => {
                        return (
                            <div key={i} className="ticker-tape-item">
                                {item}
                            </div>
                        );
                    })}
                </span>
            </div>
        );
    }
}

export default TickerTape;