const expect = require("chai").expect;
const setupOrGetMockApp = require("./resources/mockApp");
const RefundDaemon = require("../services/RefundDaemon");

describe("RefundDaemon", () => {
    const mockSettings = {
        interval: {
            minutes: 15
        },
        refundSubscriptionsOlderThan: {
            hours: 0
        }
    };

    it("Should find subscriptions elible for refund", () => {
        let subscriptions = [];

        return setupOrGetMockApp()
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        global.refundDaemon = new RefundDaemon(mockSettings, global.sequelize);
                        refundDaemon
                            .findNotRefundedSubscriptionsOlderThan(1000)
                            .then((data) => resolve(data));
                    }, 2000);
                });
            }).then(oldSubscriptions => {
                subscriptions = oldSubscriptions;
                console.log(oldSubscriptions);
                return refundDaemon.findSubscriptionContracts(subscriptions);
            }).then(contracts => {
                console.log(contracts);
                return refundDaemon.findContractsToRefund(contracts);
            }).then((contractsToRefund) => {
                console.log(contractsToRefund);
                return refundDaemon.findSubscribersToRefund(contractsToRefund, subscriptions)
            }).then(subscriberContracts => {
                console.log(subscriberContracts);
                return refundDaemon.findSuppliersToNotify(subscriberContracts);
            }).then(refundContracts => {
                console.log(refundContracts);
                return refundDaemon.setHasSentRefundEmail(refundContracts);
            }).then(() => refundDaemon.findNotRefundedSubscriptionsOlderThan(0))
            .then(oldSubscriptions => expect(oldSubscriptions.length).to.be.equal(0));
    }).timeout(1000 * 60);
});