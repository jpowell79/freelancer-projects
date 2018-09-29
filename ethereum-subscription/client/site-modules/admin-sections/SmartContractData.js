import React, {Component, Fragment} from "react";
import SubscriptionForm from "../forms/SubscriptionForm";
import {Form} from "semantic-ui-react";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import withMetamaskAccount from "../../hocs/withMetamaskAccount";
import {LoaderSmall} from "../../modules/icons";
import objects from "../../../services/datatypes/objects";
import {getErrorString} from "../../services/utils";
import SubscriptionTable from "../subscription/table/SubscriptionTable";
import {SubscriptionTableHead} from "../subscription/table/SubsriptionTableHead";
import {SubscriptionTableBody} from "../subscription/table/SubscriptionTableBody";
import {ContractStatus} from "../ContractStatus";
import subscriptions from "../../../services/api/subscriptions";
import {updateLiveSubscriptionContract} from "../../redux/actions";

class SmartContractData extends Component {
    state = {
        selectedContract: {}
    };

    setSubscriptionDetails = (web3, metamaskAccount, {
        address,
        contactDetails,
        subscriptionName,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        subscriptionDetails,
        exitFee,
        joinFee,
    }) => {
        const contract = new SubscriptionContract({web3, address});

        return contract.setSubscriptionDetails({
            subscriptionName,
            supplierWalletAddress: this.state.supplierWalletAddress,
            subscriptionLengthInWeeks: parseFloat(subscriptionLengthInWeeks),
            subscriptionPrice: parseFloat(subscriptionPrice),
            joinFee: parseFloat(joinFee),
            exitFee: parseFloat(exitFee),
            supplierEmail: contactDetails,
            subscriptionDetails,
            admin: metamaskAccount.address
        });
    };

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors(this.state)) return;

        const {
            messageState,
            setMessageState,
            setIsLoading,
            setComplete
        } = subscriptionForm.props;

        const {
            web3,
            metamaskAccount,
        } = this.props;

        const {
            address,
            hasFreeTrials,
            details,
            subscriptionType
        } = messageState;

        const type = this.props.subscriptionTypes.find(type => type.name === subscriptionType);

        return setIsLoading()
            .then(() => this.setSubscriptionDetails(web3, metamaskAccount, messageState))
            .then(() => subscriptions.editSubscriptionContract({
                address,
                hasFreeTrials,
                details,
                typeId: type.id
            }))
            .then(() => this.props.dispatch(updateLiveSubscriptionContract(
                Object.assign({}, this.state.selectedContract, {
                    type: messageState.subscriptionType,
                    subscriptionName: messageState.subscriptionName,
                    joiningFee: messageState.joinFee,
                    exitFee: messageState.exitFee,
                    totalSubscriptionPrice: messageState.subscriptionPrice,
                    smallDetails: messageState.subscriptionDetails,
                    subscriptionLengthInWeeks: messageState.subscriptionLengthInWeeks,
                    details,
                    hasFreeTrials,
                    address,
                }))
            )).then(() => {
                setComplete({
                    successTitle: "The contract has been edited successfully",
                });
            }).catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [getErrorString(err)]
                });
            });
    };

    filterContracts = () => {
        return this.props.liveSubscriptionContracts
            .filter(contract => !contract.subscriptionCancelled);
    };

    render(){
        if(this.props.metamaskAccount.isLoading){
            return (
                <Fragment>
                    <LoaderSmall/>
                    <h4 className="text-center">Detecting account changes...</h4>
                </Fragment>
            );
        }

        if(objects.isEmpty(this.props.metamaskAccount)){
            return (
                <p className="text">
                    Login to metamask in order to edit a smart contract.
                </p>
            );
        }

        if(objects.isEmpty(this.state.selectedContract)){
            return (
                <Fragment>
                    <h2>Edit Smart Contract Data</h2>

                    <SubscriptionTable
                        maxRows={20}
                        subscriptionContracts={this.filterContracts()}
                    >
                        <SubscriptionTableHead
                            columns={{
                                reputation: null,
                                walletAge: null,
                                registrationAge: null,
                                moreInfo: null,
                                supplier: <th key="status">Status</th>
                            }}
                        />
                        <SubscriptionTableBody
                            className="clickable"
                            onClick={(contract) => this.setState({
                                selectedContract: contract
                            })}
                            getColumns={(contract) => ({
                                reputation: null,
                                walletAge: null,
                                moreInfo: null,
                                registrationAge: null,
                                supplier: (
                                    <td key="status">
                                        <ContractStatus contract={contract}/>
                                    </td>
                                )
                            })}
                        />
                    </SubscriptionTable>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <h2>Edit {this.state.selectedContract.address}</h2>
                <SubscriptionForm
                    onSubmit={this.handleSubmit}
                    defaultState={Object.assign({}, this.state.selectedContract, {
                        joinFee: this.state.selectedContract.joiningFee,
                        subscriptionPrice: this.state.selectedContract.totalSubscriptionPrice,
                        subscriptionType: this.state.selectedContract.type,
                        subscriptionDetails: this.state.selectedContract.smallDetails,
                        details: this.state.selectedContract.details
                    })}
                    renderBottomChildren={({messageState, setMessageState}) => {
                        return (
                            <Fragment>
                                <Form.Field error={
                                    messageState.fieldsWithErrors.includes("details")
                                }>
                                    <label>Subscription Details (max 2048 characters)</label>
                                    <span className="counter">
                                        {2048 - messageState.details.length}
                                    </span>
                                    <textarea
                                        value={messageState.details}
                                        disabled={messageState.isLoading || messageState.complete}
                                        onChange={(event) => {
                                            if(event.target.value.length <= 2048){
                                                setMessageState({
                                                    details: event.target.value
                                                });
                                            }
                                        }}
                                        rows={6}
                                    />
                                </Form.Field>
                            </Fragment>
                        );
                    }}
                    renderExtraButtons={({messageState}) => (
                        <button
                            className="ui button"
                            style={{marginLeft: "15px"}}
                            disabled={messageState.isLoading}
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({selectedContract: {}});
                            }}>
                            {messageState.complete ? "Back" : "Cancel"}
                        </button>
                    )}
                />
            </Fragment>
        );
    }
}

export default withMetamaskAccount(SmartContractData);