import axios from 'axios';
import urls from '../../services/urls';
import {loadSettings, updateAccount, isLoadingAccount} from "../redux/actions";
import {isServer} from '../../services/utils';

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;
    }

    dispatchLoadSettings = async ({request}) => {
        if(isServer()){
            const session = (request) ? request.session : null;
            const url = `http://${request.headers.host}`;

            return axios({
                method: 'get',
                url: url + urls.settings,
                credentials: 'same-origin',
                data: {'session': session}
            }).then(response => {
                this.dispatch(loadSettings(response.data));
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            return axios.get(urls.settings)
                .then(response => {
                    this.dispatch(loadSettings(response.data));
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    dispatchUpdateAccount = async (web3) => {
        this.dispatch(isLoadingAccount());

        return web3.fetchAccount().then(account => {
            this.dispatch(updateAccount(account));
        }).catch(err => {
            console.error(err);
            this.dispatch(updateAccount({}));
        });
    };
}

export default Dispatcher;