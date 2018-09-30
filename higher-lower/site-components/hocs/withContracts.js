import React, {Component} from "react";
import factoryContractRequest from "../../services/smart-contracts/factoryContract";
import TemplateContract from "../../services/smart-contracts/TemplateContract";
import {getChildProps} from "../../services/utils";
import {updateFactoryContract, updateTemplateContract} from "../../redux/actions";
import {connect} from "react-redux";

export default (PageComponent) => {
    class ContractFetcher extends Component {
        static mapStateToProps = ({factoryContract, templateContract}) => ({
            factoryContract,
            templateContract
        });

        static async getInitialProps (appContext) {
            const {reduxStore} = appContext;

            await ContractFetcher.updateContracts(reduxStore.dispatch);

            return await getChildProps(PageComponent, appContext);
        }

        static updateContracts = async (dispatch) => {
            const masterContract = await factoryContractRequest.fetch();
            const templateContractRequest = new TemplateContract(
                masterContract.latestSpawnedContract
            );
            const templateContract = await templateContractRequest.fetch();

            dispatch(updateFactoryContract(masterContract));
            dispatch(updateTemplateContract(templateContract));
        };

        constructor(props){
            super(props);

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
