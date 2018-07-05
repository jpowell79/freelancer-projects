import React, {Component, Fragment} from 'react';

/**
 * Hides an element during the intial server/client side
 * rendering to help keeping them equal.
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