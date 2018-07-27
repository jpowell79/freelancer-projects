import axios from 'axios';
import urls from '../../services/urls';
import {loadSettings} from "../redux/actions";
import {isServer} from '../../services/utils';

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;
    }

    fetchSettings = async ({request}) => {
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
    }
}

export default Dispatcher;