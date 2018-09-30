import constants from "./constants";

export const updateFactoryContract = (factoryContract) => {
    return {
        type: constants.UPDATE_FACTORY_CONTRACT,
        payload: factoryContract
    }
};