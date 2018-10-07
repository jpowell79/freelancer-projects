import React, {Component} from "react";
import EditContract from "./EditContract";
import EditSubscription from "./EditSubscription";
import EditSubscriptionTrial from "./EditSubscriptionTrial";
import objects from "../../../../services/datatypes/objects";
import {Menu} from "semantic-ui-react";
import PropTypes from "prop-types";
import {LoaderSmall} from "../../../modules/icons";
import {deselectEditContract} from "../../../redux/actions";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";
import Dispatcher from "../../../services/loaders/Dispatcher";

export {
    EditContract,
    EditSubscription,
    EditSubscriptionTrial
};

const sections = {
    editContract: "Edit Contract",
    editSubscription: "Edit Subscription",
    editSubscriptionTrial: "Edit Subscription Trial"
};

class SubscriptionSections extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        editContract: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };

    state = {
        active: 0
    };

    componentDidMount(){
        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: this.props.editContract.address
        });

        return new Dispatcher(this.props.dispatch)
            .dispatchUpdateSubscriptionDetails({
                subscriptionContract,
                supplierAddress: this.props.user.walletAddress
            });
    }

    renderSection = () => {
        const {
            editContract,
            editSubscription,
            editSubscriptionTrial
        } = sections;

        const activeSection = objects.values(sections)[this.state.active];

        switch(activeSection){
        case editContract:
            return <EditContract {...this.props}/>;
        case editSubscription:
            return <EditSubscription {...this.props}/>;
        case editSubscriptionTrial:
            return <EditSubscriptionTrial {...this.props}/>;
        default:
            return null;
        }
    };

    render(){
        if(this.props.metamaskAccount.isLoading){
            return (
                <div className="text-center">
                    <LoaderSmall/>
                    <p className="text">Detecting account changes...</p>
                </div>
            );
        }

        if(objects.isEmpty(this.props.metamaskAccount)){
            return <p className="text">Login to metamask in order to edit this contract.</p>;
        }

        return (
            <div>
                <Menu fluid stackable>
                    {objects.values(sections)
                        .map((section, i) => {
                            return (
                                <Menu.Item
                                    key={i}
                                    link
                                    active={this.state.active === i}
                                    onClick={() => this.setState({active: i})}
                                >{section}</Menu.Item>
                            );
                        })
                    }
                    <Menu.Item
                        position="right"
                        link
                        active={false}
                        onClick={() => this.props.dispatch(deselectEditContract())}
                    >Back to main page</Menu.Item>
                </Menu>
                {this.renderSection()}
            </div>
        );
    }
}

export default SubscriptionSections;