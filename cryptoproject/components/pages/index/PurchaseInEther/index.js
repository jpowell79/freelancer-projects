import React, {Fragment} from 'react';
import {twoColumnGrid} from "../../../../services/cssUtils";
import Paths from "../../../../services/Paths";
import {SocialMenu} from "../../../modules/navigation/SocialMenu";
import {SOCIAL_MENU} from "../../../content-settings";

export const PurchaseInEther = ({tokenSaleAddress}) => {
    return (
        <Fragment>
            <div className={twoColumnGrid()}>
                <div className="column" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <table className="list-table">
                        <tbody>
                        <tr>
                            <td className="h3 bold content">Token symbol:</td>
                            <td className="h3 lighter">TBC</td>
                        </tr>
                        <tr>
                            <td className="h3 bold content">Token price:</td>
                            <td className="h3 lighter">TBC</td>
                        </tr>
                        <tr>
                            <td className="h3 bold content">Token supply:</td>
                            <td className="h3 lighter">TBC</td>
                        </tr>
                        <tr>
                            <td className="h3 bold content">Hard cap:</td>
                            <td className="h3 lighter">TBC</td>
                        </tr>
                        <tr>
                            <td className="h3 bold content">Main sale:</td>
                            <td className="h3 lighter">TBC</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="centered column text-center">
                    <div>
                        <h2>Purchase in Ether</h2>
                        <img src={Paths.getCryptoIcon({
                            symbol: "ETH",
                            size: 'medium'
                        })}/>
                    </div>
                </div>
            </div>
            <h2 className="ui header">
                Token Sale Address:
                <div className="sub header break-all h4">
                    <a href={`${Paths.getEtherScanAddressUrl(tokenSaleAddress)}`} target="_blank">{
                        tokenSaleAddress
                    }</a>
                </div>
            </h2>
            <div className="divider-1"/>
            <SocialMenu
                links={SOCIAL_MENU.links}
                className="justify-content-center"/>
        </Fragment>
    );
};