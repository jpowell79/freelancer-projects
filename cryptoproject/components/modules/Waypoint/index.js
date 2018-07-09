import React, {Component} from 'react';
import Waypoints from '../../../services/Waypoints';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Waypoint extends Component {
    static defaultProps = Waypoints.defaults;

    static propTypes = {
        element: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
        context: PropTypes.object,
        continuous: PropTypes.bool,
        enabled: PropTypes.bool,
        group: PropTypes.string,
        horizontal: PropTypes.bool,
        offset: PropTypes.number,
    };

    componentDidMount(){
        this.waypoint = new Waypoints({
            context: this.props.context,
            continuous: this.props.continuous,
            enabled: this.props.enabled,
            group: this.props.group,
            element: $(this.props.element)[0],
            handler: this.props.handler,
            horizontal: this.props.horizontal,
            offset: this.props.offset
        });
    }

    componentWillUnmount(){
        this.waypoint.destroy();
    }

    render(){
        return null;
    }
}

export const handleStickyOnScroll = () => {
    const $stickOnScroll = $(".sticky-on-scroll");

    if($stickOnScroll.length === 0){
        throw Error("No .sticky-on-scroll element found.");
    }

    $stickOnScroll.toggleClass('not-sticky');
    $stickOnScroll.toggleClass('sticky');
};

export default Waypoint;