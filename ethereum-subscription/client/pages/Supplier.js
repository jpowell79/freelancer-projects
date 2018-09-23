import React, {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Page from "../containers/Page";
import FullWidthSegment from "../containers/FullWidthSegment";
import withMountObserver from "../hocs/withMountObserver";
import withMetamaskAccount from "../hocs/withMetamaskAccount";
import withAuthenticateSupplier from "../hocs/withAuthenticateSupplier";
import withEthereumConversionRates from "../hocs/withEthereumConversionRates";
import withSubscriptionContracts from "../hocs/withSubscriptionContracts";
import {Menu, Segment} from "semantic-ui-react";
import objects from "../../services/datatypes/objects";
import ManageProfile from "../site-modules/shared-sections/ManageProfile";
import RequestContract from "../site-modules/supplier-sections/RequestContract";
import Subscriptions from "../site-modules/supplier-sections/Subscriptions";
import {classNames, joinClassNames} from "../services/className";
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../clientSettings";

class Supplier extends Component {
    static mapStateToProps = ({user, subscribers}) => ({user, subscribers});

    static sections = {
        subscriptions: "Your Subscriptions",
        requestContract: "Request New Contract",
        manageProfile: "Manage Your Profile"
    };

    constructor(props){
        super(props);

        this.state = {
            active: 0,
            isLoadingContracts: true
        }
    }

    componentDidMount(){
        const hasLoadedAllContracts = this.props.liveSubscriptionContracts.length ===
            this.props.subscriptionContracts
                .filter(contract => contract.ownerUsername === this.props.user.username)
                .length;

        if(!hasLoadedAllContracts){
            this.props.subscriptionContractLoader.loadContracts(contract =>
                contract.ownerUsername === this.props.user.username
            ).then(() => {
                if(this.props.isMounted){
                    this.setState({isLoadingContracts: false});
                }
            });
        } else {
            this.setState({isLoadingContracts: false});
        }
    }

    renderSection = (activeSection) => {
        const {
            subscriptions,
            requestContract,
            manageProfile
        } = Supplier.sections;

        switch(activeSection){
        case subscriptions:
            return (
                <Subscriptions
                    {...this.props}
                    user={this.props.user}
                    liveSubscriptionContracts={this.props.liveSubscriptionContracts}
                    isLoadingContracts={this.state.isLoadingContracts}
                />
            );
        case requestContract:
            return <RequestContract {...this.props}/>;
        case manageProfile:
            return <ManageProfile {...this.props}/>;
        default:
            return null;
        }
    };

    render () {
        const {active} = this.state;
        const activeSection = objects.values(Supplier.sections)[active];
        const segmentClass = classNames({
            "widthless-mobile": activeSection === Supplier.sections.subscriptions
        });

        return (
            <Page>
                <FullWidthSegment className={joinClassNames("gray", segmentClass)} skinny wrapper={1}>
                    <Menu fluid stackable>
                        {objects.values(Supplier.sections)
                            .map((section, i) => {
                                return (
                                    <Menu.Item
                                        key={i}
                                        link
                                        active={active === i}
                                        onClick={() => {
                                            this.setState({active: i});
                                        }}
                                    >{section}</Menu.Item>
                                );
                            })
                        }
                    </Menu>
                    <Segment className={segmentClass}>
                        {this.renderSection(activeSection)}
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default compose(
    connect(Supplier.mapStateToProps),
    withMountObserver,
    withMetamaskAccount,
    withAuthenticateSupplier,
    withEthereumConversionRates,
    withSubscriptionContracts({useDummyData: USE_DUMMY_SUBSCRIPTION_DATA})
)(Supplier);