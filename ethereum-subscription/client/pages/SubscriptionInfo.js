import React, {Component, Fragment} from 'react';
import {paths} from '../../services/constants';
import validation from '../../services/validation';
import strings from '../../services/strings';
import Page from '../containers/Page'
import FullWidthSegment from "../containers/FullWidthSegment";
import {Loader} from "../modules/icons";
import {ProviderRating} from "../site-modules/ProviderRating";
import {Grid, Segment} from 'semantic-ui-react';

class SubscriptionInfo extends Component {
    static async getInitialProps({res, query}) {
        if(strings.isDefined(validation.getEthereumAddressError(query.address))){
            paths.redirect(paths.pages.index, res);
            return {};
        }

        return {
            address: query.address
        };
    }

    state = {
        isLoading: true,
        contract: null
    };

    componentDidMount(){
        if(window.__DUMMY_SUBSCRIPTION_CONTRACTS__){
            this.findRequestedAddress(window.__DUMMY_SUBSCRIPTION_CONTRACTS__);
        } else {
            //TODO: Pull from real contracts.
            this.setState({isLoading: false});
        }
    }

    findRequestedAddress = (subscriptionContracts) => {
        this.setState({
            isLoading: false,
            contract: subscriptionContracts.filter(
                contract => contract.contractAddress === this.props.address
            )[0]
        });
    };

    renderContract = () => {
        if(this.state.isLoading) {
            return <Loader/>;
        }

        if(!this.state.contract){
            return (
                <p className="text text-center">
                    A contract with the given address could not be found.
                </p>
            );
        }

        const {
            subscriptionName,
            supplierName,
            reputation,
            details,
            joiningFee,
            exitFee,
            hasFreeTrials
        } = this.state.contract;

        console.log(this.state.contract);

        return (
            <div className="wrapper-2">
                <div className="text-center">
                    <h1 className="display-4">{subscriptionName}</h1>
                    <p className="text">Provided by: <strong>
                            <ProviderRating name={supplierName} reputation={reputation}/>
                        </strong>
                    </p>
                    <h2>Monthly Price: </h2>
                    <div className="wrapper-4 bold">
                    <Grid stackable columns={3}>
                        <Grid.Column>
                            <p className="text">Join Fee: {joiningFee} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Exit Fee: {exitFee} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Free Trial: {hasFreeTrials ? "Yes" : "No"}</p>
                        </Grid.Column>
                    </Grid>
                    </div>
                </div>
                <h2>Details:</h2>
                <p className="text">{details}</p>
                <div className="text-center divider-2">
                    <button className="ui huge primary button">
                        Subscribe
                    </button>
                </div>
            </div>
        );
    };

    render(){
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={1}>
                    <Segment padded>
                        {this.renderContract()}
                    </Segment>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default SubscriptionInfo;