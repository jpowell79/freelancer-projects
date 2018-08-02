import React, {Component} from 'react';
import {connect} from 'react-redux';
import SubscriptionTable from "../SubscriptionTable";

class Subscriptions extends Component {
    static mapStateToProps = ({user}) => ({user});

    render(){
        return (
            <SubscriptionTable username={this.props.user.username}/>
        );
    }
}

export default connect(Subscriptions.mapStateToProps)(Subscriptions);