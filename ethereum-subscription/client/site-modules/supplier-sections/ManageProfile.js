import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {urls} from '../../../services/constants';
import {loadServerDataIntoStoreFromClient} from "../../services/loadServerDataIntoStore";
import FormList from "../../modules/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from '../../config/withMessage';

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
            }
        ];
    }

    handleSubmit = ({username, email}) => {
        this.props.setMessageState({
            errors: [],
            showSuccess: false,
            isLoading: true
        });

        axios.post(urls.users, {
            originalUsername: this.props.user.username,
            username,
            email,
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
        }).catch(() => {
            this.props.setMessageState({
                errors: ['The provided username is already taken.'],
                isLoading: false
            });
        });
    };

    render(){
        return (
            <div className="container-5">
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