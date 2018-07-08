import React from 'react';
import {twoColumnGrid} from "../../../../services/cssUtils";
import Settings from '../../../../site-settings';
import Paths from "../../../../services/Paths";

export const WhatAreTokens = () => {
    const TOKEN_NAME = Settings.TOKEN_NAME;

    return (
        <div className={twoColumnGrid()}>
            <div className="column" style={{alignSelf: "center"}}>
                <article className="elegant article">
                    <h2>What are {TOKEN_NAME} Tokens?</h2>
                    <p>
                        {TOKEN_NAME} tokens allow owners to claim a share of
                        the dividend on a quarterly basis. Simply visit our
                        dividend page and click on the claim button. The dividend
                        ether is then transferred to the owners Ethereum wallet.
                    </p>
                    <p>
                        {TOKEN_NAME} tokens also allow owners to trade on the
                        cryptotrade game with a slight advantage. When the game
                        closes for standard players, owners of {TOKEN_NAME} tokens
                        will still be able to trade for an additional period of time.
                    </p>
                </article>
            </div>
            <div className="column" style={{alignSelf: "center"}}>
                <img src={Paths.getImage({
                    name: 'what_are_tokens',
                    size: 'medium',
                    type: 'png'
                })}/>
            </div>
        </div>
    );
};