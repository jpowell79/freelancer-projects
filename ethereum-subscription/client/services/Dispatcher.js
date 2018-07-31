import axios from 'axios';
import urls from '../../services/constants/urls';
import {
    loadSettings,
    updateMetamaskAccount,
    isLoadingAccount,
    updateUser
} from "../redux/actions";
import {isServer} from '../../services/utils';
import parser from './parser';

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;
    }

    dispatchUpdateUser = async (user) => {
        this.dispatch(updateUser(user));
    };

    dispatchLoadSettings = async ({req}) => {
        const dispatchLoadSetting = (response) => {
            const settings = {};

            response.data.forEach(setting => {
                settings[setting.name] = setting;
            });

            this.dispatch(loadSettings(parser.parseSettings(settings)));
        };

        if(isServer()){
            const session = (req) ? req.session : null;
            const url = `http://${req.headers.host}`;

            return axios({
                method: 'get',
                url: url + urls.settings,
                credentials: 'same-origin',
                data: {'session': session}
            })
            .then(dispatchLoadSetting)
            .catch(err => {
                console.error(err);
            });
        } else {
            return axios.get(urls.settings)
                .then(dispatchLoadSetting)
                .catch(err => {
                    console.error(err);
                });
        }
    };

    dispatchUpdateAccount = async (web3) => {
        this.dispatch(isLoadingAccount());

        return web3.fetchAccount().then(account => {
            this.dispatch(updateMetamaskAccount(account));
        }).catch(err => {
            console.error(err);
            this.dispatch(updateMetamaskAccount({}));
        });
    };
}

export default Dispatcher;