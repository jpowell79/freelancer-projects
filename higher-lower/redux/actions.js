import constants from "./constants";

export const turnOnDangerMode = () => ({
    type: constants.TURN_ON_DANGER_MODE
});

export const turnOffDangerMode = () => ({
    type: constants.TURN_OFF_DANGER_MODE
});

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

export const updatePreviousContract = (previousContract) => ({
    type: constants.UPDATE_PREVIOUS_CONTRACT,
    payload: previousContract
});