import factoryContractRequest from "./smart-contracts/factoryContract";
import {
    updateFactoryContract,
    updatePreviousContract,
    updateTemplateContract
} from "../redux/actions";
import TemplateContract from "./smart-contracts/TemplateContract";
import PreviousContract from "./smart-contracts/PreviousContract";

class Dispatcher {
    static async updateContracts(dispatch){
        const masterContract = await factoryContractRequest.fetch();
        const templateContractRequest = TemplateContract.getInstance(
            masterContract.latestSpawnedContract
        );
        const templateContract = await templateContractRequest.fetch();

        dispatch(updateFactoryContract(masterContract));
        dispatch(updateTemplateContract(templateContract));

        if(masterContract.previousContract){
            const previousContractRequest = PreviousContract.getInstance(
                masterContract.previousContract
            );
            const previousContract = await previousContractRequest.fetch();
            dispatch(updatePreviousContract(previousContract));
        }
    };
}

export default Dispatcher;