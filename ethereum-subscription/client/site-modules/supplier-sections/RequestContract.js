import React, {Component} from "react";
import WeiCalculator from "../WeiCalculator";
import {Form, Segment, Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import SubscriptionForm from "../forms/SubscriptionForm";
import {getErrorString} from "../../services/utils";
import email from "../../../services/api/email";

class RequestContract extends Component {
    static mapStateToProps = ({user}) => ({user});

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors()) return;

        const {
            messageState,
            setMessageState
        } = subscriptionForm.props;

        setMessageState({
            isLoading: true,
            errors: []
        });

        return email.sendContractRequestMail(messageState)
            .then(() => {
                setMessageState({
                    isLoading: false,
                    complete: true,
                    successTitle: "Your request has been sent successfully!",
                    success: [`You will receive an email when the admins have processed your request`],
                    showSuccess: true
                });
            })
            .catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [getErrorString(err)]
                });
            });
    };

    render(){
        const {user} = this.props;

        return (
            <Grid stackable doubling columns={2} className="reverse-order">
                <Grid.Column>
                    <Segment padded>
                        <h2>Request New Contract</h2>
                        <SubscriptionForm
                            topChildren={
                                <Form.Field>
                                    <label>Your Ethereum Wallet Address</label>
                                    <span style={{wordBreak: "break-all"}} className="field-text">
                                        {user.walletAddress}
                                    </span>
                                </Form.Field>
                            }
                            onSubmit={this.handleSubmit}
                        />
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
    }
}

export default connect(RequestContract.mapStateToProps)(RequestContract);