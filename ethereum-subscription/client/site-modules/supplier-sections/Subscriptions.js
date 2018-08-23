import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SubscriptionTable from "../SubscriptionTable";
import withSubscriptionContracts from '../../hocs/withSubscriptionContracts';
import {LoaderSmall} from "../../modules/icons";
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../../clientSettings";
import objects from '../../../services/objects';
import EditContractForm from "../forms/EditContractForm";
import {Menu, Segment} from 'semantic-ui-react';
import EditSubscriptionForm from "../forms/EditSubscriptionForm";
import SubscriptionContract from '../../../services/smart-contracts/SubscriptionContract';
import subscriptions from '../../../services/api/subscriptions';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import {loadServerDataIntoStoreFromClient} from "../../services/loadServerDataIntoStore";
import {getErrorString} from "../../services/utils";

class Subscriptions extends Component {
    static mapStateToProps = ({user}) => ({user});

    static sections = {
        editContract: 'Edit Contract',
        editSubscription: 'Edit Subscription',
        editSubscriptionTrial: 'Edit Subscription Trial'
    };

    state = {
        isLoading: true,
        editContract: {},
        active: 0
    };

    componentDidMount(){
        this.props.loadContracts(contract =>
            contract.ownerUsername === this.props.user.username
        ).then(() => {
            this.setState({isLoading: false});
        });
    }

    handleAuthFormSubmit = (state, trial = false) => {
        const {
            web3,
            username,
            password,
            other,
            duration
        } = state;

        const subscriptionContract = new SubscriptionContract({
            address: this.state.editContract.address,
            web3
        });

        if(trial){
            return subscriptionContract.setTrialSubscriptionDetails({
                supplierAddress: this.props.user.walletAddress,
                supplierEmail: this.props.user.email,
                username,
                password,
                other,
                trialDurationInDays: duration
            });
        }

        return subscriptionContract.setFullSubscriptionDetails({
            supplierAddress: this.props.user.walletAddress,
            supplierEmail: this.props.user.email,
            username,
            password,
            other
        });
    };

    handleActivateSubscription = (state, trial = false) => {
        const {web3} = state;

        const subscriptionContract = new SubscriptionContract({
            address: this.state.editContract.address,
            web3
        });

        if(trial){
            return subscriptionContract.startTheTrial({
                supplierAddress: this.props.user.walletAddress
            });
        }

        return subscriptionContract.startTheSubscription({
            supplierAddress: this.props.user.walletAddress
        });
    };

    handleActivateContract = async () => {
        return subscriptions.activateSubscriptionContract({
            address: this.state.editContract.address
        }).then(() => loadServerDataIntoStoreFromClient(
            this.props.dispatch,
            {subscriptionContracts: true}
        )).then(() => {
            this.setState((prevState) => ({
                editContract: {
                    ...prevState.editContract,
                    isActive: true
                }
            }), () => {
                AlertOptionPane.showSuccessAlert({
                    message: 'The contract is now active and visible to subscribers.'
                });
            });
        }).catch(err => {
            AlertOptionPane.showErrorAlert({
                message: getErrorString(err)
            })
        });
    };

    renderSection = () => {
        const {
            editContract,
            editSubscription,
            editSubscriptionTrial
        } = Subscriptions.sections;

        const activeSection = objects.values(Subscriptions.sections)[this.state.active];

        switch(activeSection){
        case editContract:
            return (
                <Fragment>
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
                    {(!this.state.editContract.isActive) && (
                        <Fragment>
                            <hr className="ui divider"/>
                            <button
                                className="ui bg-color-uiRed color-white button"
                                onClick={this.handleActivateContract}
                            >
                                Activate Contract
                            </button>
                        </Fragment>
                    )}
                </Fragment>
            );
        case editSubscription:
            //TODO: Fill with viewFullSubscriptionDetails as defaults
            return (
                <EditSubscriptionForm
                    onSubmit={this.handleAuthFormSubmit}
                    showActivate={!this.state.editContract.subscriptionActive}
                    onActivate={this.handleActivateSubscription}
                />
            );
        case editSubscriptionTrial:
            //TODO: Fill with viewTrialSubscriptionDetails as defaults
            return (
                <EditSubscriptionForm
                    title="Edit Subscription Trial"
                    onSubmit={(state) => this.handleAuthFormSubmit(state, true)}
                    showActivate={this.state.editContract.trialInfoShared}
                    onActivate={(state) => this.handleActivateSubscription(state, true)}
                    activateButtonText="Start the Trial"
                    labels={{
                        username: 'Trial username:',
                        password: 'Trial password:',
                        duration: 'Trial duration (in days):',
                    }}
                />
            );
        default:
            return null;
        }
    };

    render(){
        if(this.state.isLoading){
            return <LoaderSmall/>;
        }

        if(!objects.isEmpty(this.state.editContract)){
            return (
                <div>
                    <Menu fluid stackable>
                        {objects.values(Subscriptions.sections)
                            .map((section, i) => {
                                return (
                                    <Menu.Item
                                        key={i}
                                        link
                                        active={this.state.active === i}
                                        onClick={() => {
                                            this.setState({active: i});
                                        }}
                                    >{section}</Menu.Item>
                                );
                            })
                        }
                    </Menu>
                    <Segment>
                        <div className="container-4">
                            {this.renderSection()}
                        </div>
                    </Segment>
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
                            {!contract.isActive ? "Activate" : "Edit"}
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