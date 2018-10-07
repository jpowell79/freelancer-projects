import React, {Component, Fragment} from "react";

/**
 * Hides an element which may change between the initial server and client
 * side rendering.
 */
class HideFragment extends Component {
    state = {
        hide: true
    };

    componentDidMount(){
        this.setState({
            hide: false
        });
    }

    render(){
        return (
            (!this.state.hide)
                ? (
                    <Fragment>
                        {this.props.children}
                    </Fragment>
                ) : null
        );
    }
}

export default HideFragment;