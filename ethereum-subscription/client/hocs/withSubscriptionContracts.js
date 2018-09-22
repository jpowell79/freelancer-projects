import React, {Component} from "react";
import {getChildProps} from "../services/utils";
import DummyContractLoader from "../services/loaders/DummyContractLoader";
import SubscriptionContractLoader from "../services/loaders/SubscriptionContractLoader";
import {connect} from "react-redux";

const defaultOptions = {
    useDummyData: false,
    amountOfDummyDataToGenerate: 513,
    amountOfSubscriptionDataToLoadPerBatch: 100
};

export default (options = {}) => (PageComponent) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    class SubscriptionContractProvider extends Component {
        static async getInitialProps (appContext){
            return await getChildProps(PageComponent, appContext);
        }

        static mapStateToProps = ({
            liveSubscriptionContracts,
            users,
            subscriptionContracts,
            subscriptionTypes,
            subscriptions
        }) => ({
            liveSubscriptionContracts,
            users,
            subscriptionContracts,
            subscriptionTypes,
            subscriptions
        });

        constructor(props){
            super(props);

            const {
                users,
                dispatch,
                subscriptionContracts,
                subscriptionTypes,
                subscriptions
            } = props;

            this.subscriptionContractLoader = (mergedOptions.useDummyData)
                ? new DummyContractLoader({
                    amountToGenerate: mergedOptions.amountOfDummyDataToGenerate,
                    dispatch
                }) : new SubscriptionContractLoader({
                    dispatch,
                    users,
                    dbSubscriptionContracts: subscriptionContracts,
                    subscriptionTypes,
                    subscriptions,
                    amountToLoadPerBatch: mergedOptions.amountToLoadPerBatch
                });
        }

        render(){
            return (
                <PageComponent
                    {...this.props}
                    subscriptionContractLoader={this.subscriptionContractLoader}
                />
            );
        }
    }

    return connect(SubscriptionContractProvider.mapStateToProps)(SubscriptionContractProvider);
};