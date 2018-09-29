import React from "react";
import objects from "../../../../services/datatypes/objects";
import {hideOnMobile, hideOnTablet, showOnMobile} from "../../../services/constants/css";

export const SubscriptionTableHead = ({columns = {}, children}) => {
    const defaultColumns = {
        subscriptionType: (
            <th key="subscriptionType">
                Subscription<span className={hideOnMobile()}> Type</span>
            </th>
        ),
        supplier: <th key="supplier">Supplier</th>,
        reputation: <th key="reputation" className={hideOnTablet()}>Reputation</th>,
        registrationAge: <th key="registrationAge" className={hideOnTablet()}>Registration Age</th>,
        walletAge: <th key="walletAge" className={hideOnTablet()}>Wallet Age</th>,
        freeTrial: <th key="freeTrial"><span className={hideOnMobile()}>Free </span>Trial</th>,
        joinFee: <th key="joinFee" className={hideOnTablet()}>Join Fee</th>,
        exitFee: <th key="exitFee" className={hideOnTablet()}>Exit Fee</th>,
        contractLength: <th key="contractLength" className={hideOnTablet()}>Contract Length</th>,
        price: (
            <th key="price">
                <span className={hideOnMobile()}>4 Week </span>
                <span className={showOnMobile()}>4-wk </span>
                Price
            </th>
        ),
        moreInfo: <th key="moreInfo" className="no-sort"/>
    };

    const mergedColumns = Object.assign({}, defaultColumns, columns);

    return (
        <tr>
            {objects.values(mergedColumns)}
            {children}
        </tr>
    );
};