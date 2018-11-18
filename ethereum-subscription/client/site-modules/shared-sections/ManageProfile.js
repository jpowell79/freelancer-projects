import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {roles} from "../../../services/constants";
import DatabaseDataLoader from "../../services/loaders/DatabaseDataLoader";
import FormList from "../../containers/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import {getErrorString} from "../../services/utils";
import {Grid, Message} from "semantic-ui-react";
import users from "../../../services/api/users";

class ManageProfile extends Component {
    static mapStateToProps = ({user}) => ({user});

    constructor(props){
        super(props);

        this.fields = [
            {
                type: "username",
                label: "Username:",
                defaultValue: props.user.username
            },
            {
                type: "email",
                label: "Email:",
                defaultValue: props.user.email
            },
            {
                type: "password",
                label: "Password:",
                defaultValue: ""
            }
        ];
    }

    handleSubmit = ({username, email, password}) => {
        console.log("Submit");

        return this.props.setMessageState({
            errors: [],
            showSuccess: false,
            isLoading: true
        }).then(() => users.updateSupplier({
            originalUsername: this.props.user.username,
            username,
            email,
            password,
        })).then(userResponse => {
            return new DatabaseDataLoader(this.props.dispatch, {
                user: true,
                userData: userResponse.data
            }).loadFromClientSide();
        }).then(() => this.props.setMessageState({
            errors: [],
            showSuccess: true,
            isLoading: false
        })).catch(err => {
            console.error(err);

            let error = getErrorString(err);
            error = (error === "The given contract already exists")
                ? "A user with the given email already exists"
                : error;

            return this.props.setMessageState({
                errors: [(error.includes("Sequelize") ? "Username already exists" : error)],
                isLoading: false
            })
        });
    };

    render(){
        const columns = (this.props.user.role === roles.admin) ? 1 : 2;

        return (
            <Grid padded stackable doubling columns={columns}>
                <Grid.Column>
                    <h2>Manage Your Profile</h2>
                    {this.props.renderMessages()}
                    <FormList
                        fields={this.fields}
                        onSubmit={this.handleSubmit}
                        onError={() => {
                            return this.props.setMessageState({
                                showSuccess: false,
                                errors: []
                            });
                        }}
                        disabled={this.props.messageState.isLoading}
                        submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Save"}
                    />
                </Grid.Column>
                <Grid.Column>
                    <h2>Other Information</h2>
                    <Message info>
                        <div className="header mb-10">
                            Your wallet age is:
                        </div>
                        <span className="h4">{this.props.user.walletAge}</span>
                        <hr className="ui divider"/>
                        <div className="header mb-10">
                            Your reputation is:
                        </div>
                        <span className="h4">{this.props.user.rating}</span>
                        {this.props.user.role === roles.supplier && (
                            <Fragment>
                                <hr className="ui divider"/>
                                <div className="header">
                                    Your wallet address is:
                                </div>
                                <span className="h4">{this.props.user.walletAddress}</span>
                                <ul className="list">
                                    <li className="content">
                                        You will need to contact our support team if you ever
                                        need to change this address
                                    </li>
                                    <li className="content">
                                        You will lose all feedback if you do this.
                                    </li>
                                </ul>
                            </Fragment>
                        )}
                    </Message>
                </Grid.Column>
            </Grid>

        );
    }
}

export default withMessage(connect(ManageProfile.mapStateToProps)(ManageProfile));