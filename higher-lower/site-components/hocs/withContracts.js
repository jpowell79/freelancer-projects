import React, {Component} from "react";
import factoryContractRequest from "../../services/smart-contracts/factoryContract";
import TemplateContract from "../../services/smart-contracts/TemplateContract";
import {getChildProps} from "../../services/utils";
import {connect} from "react-redux";
import Dispatcher from "../../services/Dispatcher";

export default (PageComponent) => {
    class ContractFetcher extends Component {
        static mapStateToProps = ({factoryContract, templateContract}) => ({
            factoryContract,
            templateContract
        });

        static async getInitialProps (appContext) {
            const {reduxStore} = appContext;

            await Dispatcher.updateContracts(reduxStore.dispatch);

            return await getChildProps(PageComponent, appContext);
        }

        constructor(props){
            super();

            this.templateContractRequest = new TemplateContract(
                props.factoryContract.latestSpawnedContract
            );
        }

        render() {
            return (
                <PageComponent
                    templateContractRequest={this.templateContractRequest}
                    factoryContractRequest={factoryContractRequest}
                    {...this.props}
                />
            );
        }
    }

    return connect(ContractFetcher.mapStateToProps)(ContractFetcher);
}
