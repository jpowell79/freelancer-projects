import React from "react";
import objects from "../../../../services/datatypes/objects";
import {hideOnMobile, hideOnTablet} from "../../../services/constants/css";
import strings from "../../../../services/datatypes/strings";
import {paths} from "../../../../services/constants";
import {classNames} from "../../../services/className";
import {ProviderRating} from "../../ProviderRating";
import {weiToEth} from "../../../../services/utils";
import Link from "next/link";

export const SubscriptionTableBody = ({
    contracts = [],
    getColumns = () => ({}),
    onClick = () => {},
    children,
    ...props
}) => {
    return contracts.map((contract, i) => {
        const buttonClass = classNames({
            "ui button": true,
            "primary": !contract.subscriptionActive,
            "bg-color-uiRed color-white": contract.subscriptionActive
        });

        const defaultColumns = {
            subscriptionType: (
                <td key="subscriptionType">
                    {contract.type}
                </td>
            ),
            supplier: (
                <td key="supplier">
                    <ProviderRating
                        name={contract.supplierName}
                        reputation={contract.reputation}
                    />
                </td>
            ),
            reputation: (
                <td key="reputation" className={hideOnTablet()}>
                    {contract.reputation}
                </td>
            ),
            registrationAge: (
                <td key="registrationAge" className={hideOnTablet()}>{
                    strings.toDateString(new Date(contract.contractCreation))
                }</td>
            ),
            walletAge: (
                <td key="walletAge" className={hideOnTablet()}>
                    {contract.walletAge}
                </td>
            ),
            freeTrial: (
                <td key="freeTrial">
                    {contract.hasFreeTrials ? "Yes" : "No"}
                </td>
            ),
            joinFee: (
                <td key="joinFee" className={hideOnTablet()}>
                    {weiToEth(contract.joiningFee)} Eth
                </td>
            ),
            exitFee: (
                <td key="exitFee" className={hideOnTablet()}>
                    {weiToEth(contract.exitFee)} Eth
                </td>
            ),
            contractLength: (
                <td key="contractLength" className={hideOnTablet()}>
                    {contract.subscriptionLengthInWeeks} Weeks
                </td>
            ),
            price: (
                <td key="price">
                    {(contract.subscriptionLengthInWeeks === 0) ? 0 :
                        weiToEth(contract.totalSubscriptionPrice /
                            contract.subscriptionLengthInWeeks
                        )} Eth
                </td>
            ),
            moreInfo: (
                <td key="moreInfo">
                    <button className={buttonClass} style={{
                        whiteSpace: "nowrap"
                    }}>
                        <Link href={{
                            pathname: paths.pages.subscriptionInfo,
                            query: {address: contract.contractAddress}
                        }}><a><span
                            className={hideOnMobile()}>More </span>Info</a></Link>
                    </button>
                </td>
            )
        };

        const mergedColumns = Object.assign({}, defaultColumns, getColumns(contract, buttonClass));

        return (
            <tr key={i} onClick={() => onClick(contract)} {...props}>
                {objects.values(mergedColumns)}
                {children}
            </tr>
        )
    });
};