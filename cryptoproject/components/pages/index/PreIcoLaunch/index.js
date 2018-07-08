import React from 'react';
import {twoColumnGrid} from "../../../../services/cssUtils";
import Paths from "../../../../services/Paths";

export const PreIcoLaunch = () => {
    return (
        <div className={twoColumnGrid()}>
            <div className="column" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <table className="list-table text-left">
                    <tbody>
                    <tr>
                        <td className="h2 bold content">Token symbol:</td>
                        <td className="h2 lighter">TBC</td>
                    </tr>
                    <tr>
                        <td className="h2 bold content">Token price:</td>
                        <td className="h2 lighter">TBC</td>
                    </tr>
                    <tr>
                        <td className="h2 bold content">Token supply:</td>
                        <td className="h2 lighter">TBC</td>
                    </tr>
                    <tr>
                        <td className="h2 bold content">Hard cap:</td>
                        <td className="h2 lighter">TBC</td>
                    </tr>
                    <tr>
                        <td className="h2 bold content">Main sale:</td>
                        <td className="h2 lighter">TBC</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="column" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div>
                    <h2>Purchase in Ether</h2>
                    <img src={Paths.getCryptoIcon({
                        symbol: "ETH",
                        size: 'medium'
                    })}/>
                </div>
            </div>
        </div>
    );
};