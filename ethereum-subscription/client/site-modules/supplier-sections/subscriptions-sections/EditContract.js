import React, {Fragment} from "react";
import {Grid, Segment} from "semantic-ui-react";
import WeiCalculator from "../../WeiCalculator";
import EditContractForm from "../../forms/EditContractForm";
import subscriptions from "../../../../services/api/subscriptions";
import AlertOptionPane from "../../../services/Alert/AlertOptionPane";
import {getErrorString} from "../../../services/utils";
import {selectEditContract, updateLiveSubscriptionContract} from "../../../redux/actions";
import DatabaseDataLoader from "../../../services/loaders/DatabaseDataLoader";

export default ({user, editContract, dispatch, web3, metamaskAccount}) => {
    const handleActivateContract = async () => {
        return subscriptions.activateSubscriptionContract({
            address: editContract.address
        }).then(() => new DatabaseDataLoader(dispatch, {
            subscriptionContracts: true
        }).loadFromClientSide())
            .then(() => {
                dispatch(updateLiveSubscriptionContract({
                    ...editContract,
                    isActive: true
                }));
                dispatch(selectEditContract({
                    ...editContract,
                    isActive: true
                }));

                AlertOptionPane.showSuccessAlert({
                    message: "The contract is now active and visible to subscribers."
                });
            }).catch(err => {
                AlertOptionPane.showErrorAlert({
                    message: getErrorString(err)
                });
            });
    };

    return (
        <Grid stackable doubling columns={2} className="reverse-order">
            <Grid.Column>
                <Segment padded>
                    <EditContractForm
                        user={user}
                        contract={editContract}
                        web3={web3}
                        metamaskAccount={metamaskAccount}
                    />
                    {(!editContract.isActive) && (
                        <Fragment>
                            <hr className="ui divider"/>
                            <button
                                className="ui bg-color-uiBlue color-white button"
                                onClick={handleActivateContract}
                            >
                                Activate Contract
                            </button>
                        </Fragment>
                    )}
                </Segment>
            </Grid.Column>
            <Grid.Column className="grow">
                <Segment padded style={{width: "100%"}}>
                    <h2>Wei Calculator</h2>
                    <WeiCalculator/>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};