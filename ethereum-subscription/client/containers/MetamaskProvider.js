import React, {Component} from 'react';
import {Loader} from "../modules/icons";
import PropTypes from 'prop-types';
import objects from '../../services/datatypes/objects';
import HideFragment from './HideFragment';
import withMetamaskAccount from '../hocs/withMetamaskAccount';

/**
 * Will rerender whenever metamaskAccount changes occurs in metamask and
 * share the metamaskAccount information with all children.
 */
class MetamaskProvider extends Component {
    static propTypes = {
        loadingRenderer: PropTypes.func,
        notFoundRenderer: PropTypes.func
    };

    render(){
        const {
            metamaskAccount,
            loadingRenderer,
            notFoundRenderer,
            children
        } = this.props;

        if(this.props.metamaskAccount.isLoading){
            return (loadingRenderer)
                ? this.props.loadingRenderer(children)
                : (
                    <div className="text-center">
                        <Loader/>
                        <h3>Listening for account changes...</h3>
                    </div>
                );
        }

        if(objects.isEmpty(metamaskAccount)){
            return (
                <HideFragment>
                    {(notFoundRenderer)
                        ? notFoundRenderer(children)
                        : React.cloneElement(children, {metamaskAccount, web3: this.web3})}
                </HideFragment>
            );
        }

        return React.cloneElement(children, {metamaskAccount, web3: this.web3});
    }
}

export default withMetamaskAccount(MetamaskProvider);