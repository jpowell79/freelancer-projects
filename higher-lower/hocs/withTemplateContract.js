import React, {Component} from "react";
import TemplateContract from "../site-components/smart-contracts/TemplateContract";
import {getChildProps} from "../services/utils";
import {updateTemplateContract} from "../redux/actions";

export default (address) => (PageComponent) => {
    const templateContract = new TemplateContract(address);

    return class TemplateContractLoader extends Component {
        static async getInitialProps (appContext) {
            const {reduxStore} = appContext;

            await TemplateContractLoader.updateFactoryContract(reduxStore.dispatch);

            return await getChildProps(PageComponent, appContext);
        }

        static updateFactoryContract = async (dispatch) => {
            const contract = await templateContract.callGetters();
            dispatch(updateTemplateContract(contract));
        };

        render() {
            return (
                <PageComponent
                    templateContractLoader={templateContract}
                    {...this.props}
                />
            );
        }
    }
}
