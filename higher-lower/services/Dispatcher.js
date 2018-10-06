import factoryContractRequest from "./smart-contracts/factoryContract";
import {
    updateFactoryContract,
    updatePreviousContract,
    updateTemplateContract
} from "../redux/actions";
import TemplateContract from "./smart-contracts/TemplateContract";

class Dispatcher {
    static async updateContracts(dispatch){
        const masterContract = await factoryContractRequest.fetch();
        const templateContractRequest = new TemplateContract(
            masterContract.latestSpawnedContract
        );
        const templateContract = await templateContractRequest.fetch();

        dispatch(updateFactoryContract(masterContract));
        dispatch(updateTemplateContract(templateContract));

        if(masterContract.previousContract){
            const previousContractRequest = new TemplateContract(
                masterContract.previousContract
            );
            const previousContract = await previousContractRequest.fetch();
            dispatch(updatePreviousContract(previousContract));
        }
    };
}

export default Dispatcher;