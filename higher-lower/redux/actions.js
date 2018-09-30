import constants from "./constants";

export const updateMetamaskAccount = (metamaskAccount) => ({
    type: constants.UPDATE_METAMASK_ACCOUNT,
    payload: metamaskAccount
});

export const updateFactoryContract = (factoryContract) => ({
    type: constants.UPDATE_FACTORY_CONTRACT,
    payload: factoryContract
});

export const updateTemplateContract = (templateContract) => ({
    type: constants.UPDATE_TEMPLATE_CONTRACT,
    payload: templateContract
});