import constants from "./constants";

export const updateFactoryContract = (factoryContract) => ({
    type: constants.UPDATE_FACTORY_CONTRACT,
    payload: factoryContract
});

export const updateTemplateContract = (templateContract) => ({
    type: constants.UPDATE_TEMPLATE_CONTRACT,
    payload: templateContract
});