import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TickerTape extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    render(){
        const {
            items,
            ...props
        } = this.props;

        return (
            <div {...props} className="ticker-tape" style={{
                animationDuration: `${(items.length*2)}s`,
                width: `${items.length*115}px`
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