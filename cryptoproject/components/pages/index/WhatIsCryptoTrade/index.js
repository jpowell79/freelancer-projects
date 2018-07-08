import React from 'react';
import Paths from "../../../../services/Paths";
import {twoColumnGrid} from "../../../../services/cssUtils";

export const WhatIsCryptoTrade = () => {
    return (
        <div className={twoColumnGrid()}>
            <div className="column" style={{alignSelf: "center"}}>
                <img src={Paths.getImage({
                    name: 'what_is_cryptotrade',
                    size: 'medium',
                    type: 'jpg'
                })}/>
            </div>
            <div className="column">
                <article className="elegant article">
                    <h2>What is CryptoTrade?</h2>
                    <p>
                        CryptoTrade harnesses the power of <a>pari-mutuel betting</a> and
                        Ethereum smart contracts to bet on the performance of leading
                        crypto-currencies over a fixed period. Players will select
                        one or more crypto-currencies and place their bets using ether.
                    </p>
                    <p>
                        Once the winning crypto-currency is announced, players who
                        bet on the winning crypto will receive a share of the
                        betting pot. 95% of all bets are distributed amongst winning
                        players, and 5% is sent to a dividend fund to share amongst
                        CryptoTrade token holders.
                    </p>
                </article>
            </div>
        </div>
    );
};