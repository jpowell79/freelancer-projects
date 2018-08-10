/*------------------------------------------------------------
 * ReCAPTCHA
 *------------------------------------------------------------*/
export const RECAPTCHA_SITE_KEY = '6LcVbGIUAAAAABiMl6EkPNsNUBVRC1U2l_VwR10Z';

/*------------------------------------------------------------
 * Subscriptions
 *------------------------------------------------------------*/
//If the initial contract loading is slow, try decreasing this
//number for better performance.
export const AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH = 100;

//Loads some dummy data into memory instead of loading information
//from real smart contracts.
export const USE_DUMMY_SUBSCRIPTION_DATA = true;
export const AMOUNT_OF_DUMMY_SUBSCRIPTION_DATA_TO_GENERATE = 513;

//Tells the validation which types to not consider as "other".
export const FILTERABLE_SUBSCRIPTION_TYPES = [
    "Gym Membership",
    "IPTV Subscription",
    "Magazine Subscription",
    "Website Membership"
];