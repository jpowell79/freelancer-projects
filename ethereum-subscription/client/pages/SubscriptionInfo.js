import React, {Component} from 'react';
import {compose} from 'redux';
import {paths} from '../../services/constants';
import validation from '../../services/validation';
import strings, {isDefined} from '../../services/strings';
import Page from '../containers/Page'
import FullWidthSegment from "../containers/FullWidthSegment";
import {Loader} from "../modules/icons";
import {ProviderRating} from "../site-modules/ProviderRating";
import {Grid, Segment, Form, Message} from 'semantic-ui-react';
import withSubscriptionContracts from '../hocs/withSubscriptionContracts';
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../clientSettings";
import withMetamaskAccount from "../hocs/withMetamaskAccount";
import SubscriptionContract from '../../services/smart-contracts/SubscriptionContract';
import AlertOptionPane from "../services/Alert/AlertOptionPane";
import objects from "../../services/objects";

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

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            email: '',
            walletAddress: '',
            amount: ''
        };
    }

    componentDidMount(){
        this.props.loadContracts(contract =>
            contract.address.toLowerCase() === this.props.address.toLowerCase()
        ).then(() => {
            this.setState({isLoading: false});
        });
    }

    hasFieldErrors = () => {
        const errors = Object.keys(this.state)
            .map(key => validation.getFieldError(key, this.state[key]))
            .filter(error => isDefined(error));

        if(errors.length > 0){
            AlertOptionPane.showErrorAlert({
                htmlMessage: (
                    <Message
                        error
                        header="There was some errors with your submission"
                        list={errors}
                    />
                )
            });
            return true;
        }

        return false;
    };

    handleSubscriptionConfirm = (event, removeAlert) => {
        if(this.hasFieldErrors()) return;

        const contract = this.props.contracts[0];
        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: contract.address
        });

        //TODO: Send supplier email.
        //TODO: Send customer email.
        //TODO: Add subscription to DB.
        //TODO: Store transaction hash in DB.
        console.log(this.state);
        removeAlert();
    };

    showConfirmSubscriptionAlert = () => {
        const contract = this.props.contracts[0];

        if(objects.isEmpty(this.props.metamaskAccount)){
            AlertOptionPane.showErrorAlert({
                message: "You need to login to metamask in order to make a subscription"
            });

            return;
        }

        this.setState({
            walletAddress: this.props.metamaskAccount.address,
            amount: contract.joiningFee
        });

        AlertOptionPane.showSuccessAlert({
            title: `Subscribe to ${contract.subscriptionName}`,
            titleIcon: null,
            htmlMessage: (
                <div>
                    <h4>
                        Please confirm the following details are correct before proceeding
                    </h4>
                    <Form>
                        <Form.Field>
                            <label>
                                Your contact email address is:
                            </label>
                            <input
                                type="text"
                                defaultValue={this.state.email}
                                onChange={event => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Your ethereum wallet address is:
                            </label>
                            <input
                                type="text"
                                defaultValue={this.props.metamaskAccount.address}
                                onChange={event => {
                                    this.setState({
                                        walletAddress: event.target.value
                                    });
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                The amount of Eth you will be sending is:
                            </label>
                            <input
                                type="text"
                                defaultValue={contract.joiningFee}
                                disabled
                                onChange={event => {
                                    this.setState({
                                        amount: event.target.value
                                    });
                                }}
                            />
                        </Form.Field>
                    </Form>
                </div>
            ),
            onCancel: (event, removeAlert) => {
                removeAlert();
            },
            onConfirm: this.handleSubscriptionConfirm
        });
    };

    handleSubscribe = () => {
        this.showConfirmSubscriptionAlert();
    };

    renderContract = () => {
        if(this.state.isLoading) {
            return <Loader/>;
        }

        const contract = this.props.contracts[0];

        if(!contract){
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
        } = contract;

        return (
            <div className="wrapper-2">
                <div className="text-center">
                    <h1 className="display-4">{subscriptionName}</h1>
                    <p className="text">Provided by: <strong>
                            <ProviderRating name={supplierName} reputation={reputation}/>
                        </strong>
                    </p>
                    <h2>Monthly Price: </h2>
                    <div className="wrapper-3 bold">
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
                    <button
                        className="ui huge primary button"
                        onClick={this.handleSubscribe}
                    >
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

export default compose(
    withMetamaskAccount,
    withSubscriptionContracts({useDummyData: USE_DUMMY_SUBSCRIPTION_DATA})
)(SubscriptionInfo);