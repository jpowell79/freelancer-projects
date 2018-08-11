import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SubscriptionTable from "../SubscriptionTable";
import withSubscriptionContracts from '../../hocs/withSubscriptionContracts';
import {LoaderSmall} from "../../modules/icons";
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../../clientSettings";
import objects from '../../../services/objects';
import EditContractForm from "../forms/EditContractForm";

class Subscriptions extends Component {
    static mapStateToProps = ({user}) => ({user});

    state = {
        isLoading: true,
        editContract: {}
    };

    componentDidMount(){
        this.props.loadContracts(contract =>
            contract.ownerUsername === this.props.user.username
        ).then(() => {
            this.setState({isLoading: false});
        });
    }

    render(){
        if(this.state.isLoading){
            return <LoaderSmall/>;
        }

        if(!objects.isEmpty(this.state.editContract)){
            return (
                <div className="container-4">
                    <EditContractForm
                        user={this.props.user}
                        contract={this.state.editContract}
                        onCancel={() => {
                            this.setState({editContract: {}});
                        }}
                        onComplete={() => {
                            this.setState({editContract: {}});
                        }}
                    />
                </div>
            );
        }

        if(this.props.contracts.length === 0){
            return (
                <p className="text">You do currently not own any subscriptions.</p>
            );
        }

        return (
            <SubscriptionTable
                subscriptionContracts={this.props.contracts}
                buttonRenderer={({buttonClass, contract}) => {
                    return (
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() => {
                                this.setState({editContract: contract});
                            }}
                        >
                            Edit
                        </button>
                    );
                }}
            />
        );
    }
}

export default compose(
    withSubscriptionContracts({useDummyData: USE_DUMMY_SUBSCRIPTION_DATA}),
    connect(Subscriptions.mapStateToProps)
)(Subscriptions);