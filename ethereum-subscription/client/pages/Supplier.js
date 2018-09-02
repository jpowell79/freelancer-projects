import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateSupplier from '../hocs/withAuthenticateSupplier';
import withEthereumConversionRates from "../hocs/withEthereumConversionRates";
import withSubscriptionContracts from "../hocs/withSubscriptionContracts";
import {Menu, Segment} from 'semantic-ui-react';
import objects from '../../services/objects';
import ManageProfile from "../site-modules/supplier-sections/ManageProfile";
import RequestContract from "../site-modules/supplier-sections/RequestContract";
import Subscriptions from "../site-modules/supplier-sections/Subscriptions";
import {classNames, joinClassNames} from "../services/className";
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../clientSettings";

class Supplier extends Component {
    static mapStateToProps = ({user}) => ({user});

    static sections = {
        subscriptions: 'Your Subscriptions',
        requestContract: 'Request New Contract',
        manageProfile: 'Manage Your Profile'
    };

    constructor(props){
        super(props);

        this.hasLoadedAllContracts = props.liveSubscriptionContracts.length ===
            props.subscriptionContracts.filter(contract => contract.isActive).length;

        this.state = {
            active: 0,
            isLoadingContracts: true
        }
    }

    componentDidMount(){
        if(!this.hasLoadedAllContracts){
            this.props.subscriptionContractLoader.loadContracts(contract =>
                contract.ownerUsername === this.props.user.username
            ).then(() => this.setState({isLoadingContracts: false}));
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
                    user={this.props.user}
                    liveSubscriptionContracts={this.props.liveSubscriptionContracts}
                    isLoadingContracts={this.state.isLoadingContracts}
                />
            );
        case requestContract:
            return <RequestContract/>;
        case manageProfile:
            return <ManageProfile/>;
        default:
            return null;
        }
    };

    render () {
        const {active} = this.state;
        const activeSection = objects.values(Supplier.sections)[active];
        const segmentClass = classNames({
            'widthless-mobile': activeSection === Supplier.sections.subscriptions
        });

        return (
            <Page>
                <FullWidthSegment className={joinClassNames('gray', segmentClass)} skinny wrapper={1}>
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
    withAuthenticateSupplier,
    withEthereumConversionRates,
    withSubscriptionContracts({useDummyData: USE_DUMMY_SUBSCRIPTION_DATA}),
    connect(Supplier.mapStateToProps)
)(Supplier);