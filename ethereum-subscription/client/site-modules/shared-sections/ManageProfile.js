import React, {Component} from "react";
import {connect} from "react-redux";
import {roles} from "../../../services/constants";
import DatabaseDataLoader from "../../services/loaders/DatabaseDataLoader";
import FormList from "../../containers/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import {getErrorString} from "../../services/utils";
import {Message} from "semantic-ui-react";
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
            const error = getErrorString(err);
            console.log(error);

            return this.props.setMessageState({
                errors: [(error.includes("Sequelize") ? "Username already exists" : error)],
                isLoading: false
            })
        });
    };

    render(){
        return (
            <div className="container-3">
                {this.props.user.role === roles.supplier && (
                    <Message
                        info
                        header={`Your wallet address is: ${this.props.user.walletAddress}`}
                        list={[
                            "You will need to contact our support team if you ever need to change this address",
                            "You will lose all feedback if you do this."
                        ]}
                    />
                )}
                <h2>Manage Your Profile</h2>
                {this.props.renderMessages()}
                <FormList
                    fields={this.fields}
                    onSubmit={this.handleSubmit}
                    onError={() => {
                        this.props.setMessageState({
                            showSuccess: false,
                            errors: []
                        });
                    }}
                    disabled={this.props.messageState.isLoading}
                    submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Save"}
                />
            </div>
        );
    }
}

export default withMessage(connect(ManageProfile.mapStateToProps)(ManageProfile));