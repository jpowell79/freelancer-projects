import React, {Component} from "react";
import SubscriptionTable from "../subscription/table/SubscriptionTable";
import objects from "../../../services/datatypes/objects";
import {LoaderSmall} from "../../modules/icons";
import SubscriptionSections from "./subscriptions-sections";
import {connect} from "react-redux";
import {selectEditContract} from "../../redux/actions";
import {ContractStatus} from "../ContractStatus";
import {SubscriptionTableHead} from "../subscription/table/SubsriptionTableHead";
import {SubscriptionTableBody} from "../subscription/table/SubscriptionTableBody";

class Subscriptions extends Component {
    static mapStateToProps = ({editContract, subscriptionDetails, trialSubscriptionDetails}) => ({
        editContract,
        subscriptionDetails,
        trialSubscriptionDetails
    });

    render(){
        if(this.props.isLoadingContracts)
            return <LoaderSmall className="text-center"/>;

        if(!objects.isEmpty(this.props.editContract))
            return <SubscriptionSections {...this.props}/>;

        if(this.props.liveSubscriptionContracts.length === 0)
            return <p className="text">You do currently not own any subscriptions.</p>;

        return (
            <SubscriptionTable
                maxRows={40}
                subscriptionContracts={this.props.liveSubscriptionContracts}
            >
                <SubscriptionTableHead
                    columns={{
                        supplier: <th key="status">Status</th>
                    }}
                />
                <SubscriptionTableBody
                    getColumns={(contract) => ({
                        moreInfo: (
                            <td key="moreInfo">
                                {(contract.subscriptionCancelled)
                                    ? (
                                        <button
                                            className="ui button"
                                            disabled
                                        >Cancelled</button>
                                    ) : (
                                        <button
                                            className="ui bg-color-uiBlue color-white button"
                                            onClick={() =>
                                                this.props.dispatch(selectEditContract(contract))
                                            }
                                        >
                                            {!contract.isActive ? "Activate" : "Edit"}
                                        </button>
                                    )}
                            </td>
                        ),
                        supplier: (
                            <td key="status">
                                <ContractStatus contract={contract}/>
                            </td>
                        )
                    })}
                />
            </SubscriptionTable>
        );
    }
}

export default connect(Subscriptions.mapStateToProps)(Subscriptions);