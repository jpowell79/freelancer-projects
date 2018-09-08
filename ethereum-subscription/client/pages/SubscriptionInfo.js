import React, {Component} from 'react';
import {compose} from 'redux';
import withMountObserver from "../hocs/withMountObserver";
import withSubscriptionContracts from '../hocs/withSubscriptionContracts';
import withMetamaskAccount from '../hocs/withMetamaskAccount';
import {paths} from '../../services/constants';
import validation from '../../services/validation';
import strings from '../../services/datatypes/strings';
import Page from '../containers/Page'
import FullWidthSegment from "../containers/FullWidthSegment";
import {Loader} from "../modules/icons";
import {Segment} from 'semantic-ui-react';
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../clientSettings";
import {connect} from 'react-redux';
import SubscriptionContractDetailsContainer from "../site-modules/subscription/SubscriptionContractDetailsContainer";
import Dispatcher from "../services/loaders/Dispatcher";
import SubscriptionContract from "../../services/smart-contracts/SubscriptionContract";

class SubscriptionInfo extends Component {
    static mapStateToProps = ({
        settings,
        subscribers,
        users,
        user,
        subscriptionDetails,
        trialSubscriptionDetails,
    }) => ({
        settings,
        subscribers,
        users,
        user,
        subscriptionDetails,
        trialSubscriptionDetails,
        etherScanUrl: settings.etherScanUrl.value
    });

    static async getInitialProps({res, query}) {
        if(strings.isDefined(validation.getEthereumAddressError(query.address))){
            paths.redirect(paths.pages.index, res);
            return {};
        }

        return {
            address: query.address
        };
    }

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            ownerUser: {}
        };
    }

    componentDidMount(){
        return this.loadContract()
            .then(() => {
                if(this.props.liveSubscriptionContracts.length > 0){
                    return new Dispatcher(this.props.dispatch)
                        .dispatchUpdateSubscriptionDetails({
                            subscriptionContract: new SubscriptionContract({
                                web3: this.props.web3,
                                address: this.props.liveSubscriptionContracts[0].address
                            }),
                            supplierAddress: this.state.ownerUser.walletAddress
                        })
                }
            });
    }

    loadContract = async () => {
        return new Promise(resolve => this.setState({isLoading: true}, () => resolve()))
            .then(() => this.props.subscriptionContractLoader.loadContracts(contract => (
                contract.address.toLowerCase() === this.props.address.toLowerCase() &&
                contract.isActive
            ))).then(contracts => {
                const contract = (contracts && contracts.length > 0) ? contracts[0] : {};

                if(this.props.isMounted){
                    this.setState({
                        isLoading: false,
                        ownerUser: this.props.users.filter(user =>
                            user.username === contract.ownerUsername
                        )[0]
                    });
                }
            }).catch(console.error);
    };

    render(){
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={1}>
                    <Segment padded>
                        {(this.state.isLoading || this.props.metamaskAccount.isLoading)
                            ? <Loader/>
                            : (
                                <SubscriptionContractDetailsContainer
                                    {...this.props}
                                    ownerUser={this.state.ownerUser}
                                />
                            )
                        }
                    </Segment>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default compose(
    withMountObserver,
    withSubscriptionContracts({
        useDummyData: USE_DUMMY_SUBSCRIPTION_DATA
    }),
    withMetamaskAccount,
    connect(SubscriptionInfo.mapStateToProps)
)(SubscriptionInfo);