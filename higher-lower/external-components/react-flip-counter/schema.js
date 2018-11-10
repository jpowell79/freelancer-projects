import PropTypes from "prop-types";

export default {
    types: {
        stop: PropTypes.instanceOf(Date),
        onStart: PropTypes.func,
        onStop: PropTypes.func,
        isStopped: PropTypes.bool,
        notifyAt: PropTypes.number,
        notify: PropTypes.func,
        hasNotified: PropTypes.bool
    },

    defaults: {
        stop: new Date("Mon Nov 30 2020 00:00:00 GMT+0300 (MSK)")
    }
};
