import React, {Component} from "react";
import factoryContract from "../site-components/smart-contracts/factoryContract";
import {getChildProps} from "../services/utils";
import {updateFactoryContract} from "../redux/actions";

export default (PageComponent) => {
    return class FactoryContractLoader extends Component {
        static async getInitialProps (appContext) {
            const {reduxStore} = appContext;

            await FactoryContractLoader.updateFactoryContract(reduxStore.dispatch);

            return await getChildProps(PageComponent, appContext);
        }

        static updateFactoryContract = async (dispatch) => {
            const contract = await factoryContract.callGetters();
            dispatch(updateFactoryContract(contract));
        };

        render() {
            return (
                <PageComponent
                    factoryContractLoader={factoryContract}
                    {...this.props}
                />
            );
        }
    }
}
