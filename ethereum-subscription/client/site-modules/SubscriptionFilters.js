import React, {Component, Fragment} from 'react';
import {Grid, Segment, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SubscriptionFilters extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            gymMembershipChecked: true,
            iptvSubscriptionChecked: true,
            otherChecked: true,
            magazineSubscriptionChecked: true,
            websiteMembershipChecked: true,
            showActiveSubscriptionsChecked: true,
            checkAllSubscriptionTypes: true,
            showJoinFeeChecked: true,
            showExitFeeChecked: true,
            showZeroReputationChecked: true,
            checkAllAdditional: true,
            txHashSearch: ''
        };

        props.onChange(this.state);
    }

    handleCheckAllAdditional = () => {
        this.setState(prevState => {
            const newState = (prevState.checkAllAdditional)
                ? ({
                    showJoinFeeChecked: false,
                    showExitFeeChecked: false,
                    showZeroReputationChecked: false,
                    checkAllAdditional: false
                })
                : ({
                    showJoinFeeChecked: true,
                    showExitFeeChecked: true,
                    showZeroReputationChecked: true,
                    checkAllAdditional: true
                });

            this.props.onChange({
                ...this.state,
                ...newState
            });

            return newState;
        });
    };

    handleCheckAllSubscriptionTypes = () => {
        this.setState(prevState => {
            const newState = (prevState.checkAllSubscriptionTypes)
                ? ({
                    gymMembershipChecked: false,
                    iptvSubscriptionChecked: false,
                    otherChecked: false,
                    magazineSubscriptionChecked: false,
                    websiteMembershipChecked: false,
                    checkAllSubscriptionTypes: false
                })
                : ({
                    gymMembershipChecked: true,
                    iptvSubscriptionChecked: true,
                    otherChecked: true,
                    magazineSubscriptionChecked: true,
                    websiteMembershipChecked: true,
                    checkAllSubscriptionTypes: true
                });

            this.props.onChange({
                ...this.state,
                ...newState
            });

            return newState;
        });
    };

    handleCheckboxClick = (field) => {
        this.setState((prevState) => {
            this.props.onChange({
                ...this.state,
                [field]: !prevState[field]
            });

            return {
                [field]: !prevState[field]
            };
        });
    };

    render(){
        const {
            gymMembershipChecked,
            iptvSubscriptionChecked,
            otherChecked,
            magazineSubscriptionChecked,
            websiteMembershipChecked,
            showActiveSubscriptionsChecked,
            checkAllSubscriptionTypes,
            showJoinFeeChecked,
            showExitFeeChecked,
            showZeroReputationChecked,
            checkAllAdditional,
            txHashSearch
        } = this.state;

        return (
            <Fragment>
                <Grid stackable className="unstack-md">
                    <Grid.Column width={9}>
                        <Segment>
                            <p className="bold">Show the following subscription types:</p>
                            <Form>
                                <Form.Group widths={3}>
                                    <Form.Checkbox
                                        label="Gym Membership"
                                        checked={gymMembershipChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('gymMembershipChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="IPTV Subscription"
                                        checked={iptvSubscriptionChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('iptvSubscriptionChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="Other"
                                        checked={otherChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('otherChecked');
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group widths={3}>
                                    <Form.Checkbox
                                        label="Magazine Subscription"
                                        checked={magazineSubscriptionChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('magazineSubscriptionChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="Website Membership"
                                        checked={websiteMembershipChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('websiteMembershipChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="Tick/Untick All"
                                        checked={checkAllSubscriptionTypes}
                                        onClick={this.handleCheckAllSubscriptionTypes}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Checkbox
                                        label="Show currently active subscriptions"
                                        checked={showActiveSubscriptionsChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('showActiveSubscriptionsChecked');
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Segment>
                            <p className="bold">Additional Subscription Filters:</p>
                            <Form>
                                <Form.Group widths={2}>
                                    <Form.Checkbox
                                        label="Show with Join Fee?"
                                        checked={showJoinFeeChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('showJoinFeeChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="Show with Exit Fee?"
                                        checked={showExitFeeChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('showExitFeeChecked');
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Checkbox
                                        label="Show with zero Reputation?"
                                        checked={showZeroReputationChecked}
                                        onClick={() => {
                                            this.handleCheckboxClick('showZeroReputationChecked');
                                        }}
                                    />
                                    <Form.Checkbox
                                        label="Tick/Untick All"
                                        checked={checkAllAdditional}
                                        onClick={this.handleCheckAllAdditional}
                                    />
                                </Form.Group>
                                <div>
                                    <Form.Field
                                        label="Search Subscription by Tx Hash:"
                                        control="input"
                                        style={{width: "100%"}}
                                        value={txHashSearch}
                                        onChange={(event) => {
                                            this.props.onChange({
                                                ...this.state,
                                                txHashSearch: event.target.value
                                            });

                                            this.setState({
                                                txHashSearch: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

export default SubscriptionFilters;