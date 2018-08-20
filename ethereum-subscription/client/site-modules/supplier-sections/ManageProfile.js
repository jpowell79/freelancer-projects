import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {urls} from '../../../services/constants';
import {loadServerDataIntoStoreFromClient} from "../../services/loadServerDataIntoStore";
import FormList from "../../modules/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from '../../hocs/withMessage';
import {getErrorString} from "../../services/utils";
import {Message} from 'semantic-ui-react';

class ManageProfile extends Component {
    static mapStateToProps = ({user}) => ({user});

    constructor(props){
        super(props);

        this.fields = [
            {
                type: 'username',
                label: 'Username:',
                defaultValue: props.user.username
            },
            {
                type: 'email',
                label: 'Email:',
                defaultValue: props.user.email
            },
            {
                type: 'password',
                label: 'Password:',
                defaultValue: ''
            }
        ];
    }

    handleSubmit = ({username, email, password}) => {
        this.props.setMessageState({
            errors: [],
            showSuccess: false,
            isLoading: true
        });

        axios.post(urls.users, {
            originalUsername: this.props.user.username,
            username,
            email,
            password,
            update: true
        }).then(userResponse => {
            return loadServerDataIntoStoreFromClient(this.props.dispatch, {
                user: true,
                data: {
                    user: userResponse.data
                }
            });
        }).then(() => {
            this.props.setMessageState({
                errors: [],
                showSuccess: true,
                isLoading: false
            });
        }).catch(err => {
            this.props.setMessageState({
                errors: [getErrorString(err)],
                isLoading: false
            });
        });
    };

    render(){
        return (
            <div className="container-3">
                <Message
                    info
                    header={`Your wallet address is: ${this.props.user.walletAddress}`}
                    list={[
                        'You will need to contact our support team if you ever need to change this address',
                        'You will lose all feedback if you do this.'
                    ]}
                />
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