import React, {Component} from 'react';
import Page from '../components/containers/Page';
import {PageTitle} from "../components/modules/PageTitle";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import Settings from '../site-settings';
import {Dropdown} from "../components/modules/icons";
import {Accordion} from 'semantic-ui-react';
import Link from 'next/link';
import Paths from "../services/Paths";

class HowItWorks extends Component {
    render(){
        return (
            <Page>
                <PageTitle title="How it works" className="elegant text-center">
                    <p>
                        Before you read about how CryptoTrade works, you may
                        find it useful to familiarise yourself with the following:
                    </p>
                    <div className="wrapper-2">
                        <Accordion styled>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What are Crypto Currencies?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What is Ethereum?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    How do I obtain Ethereum?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What is a blockchain?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What are smart contracts?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What are Ethereum ERC20 Tokens?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                            <Accordion.Title
                                active={1}
                                index={1}
                                onClick={() => {}}>
                                <Dropdown/>
                                <div className="content">
                                    What is Metamask?
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <h3 className="no-margin-bottom">pricing:</h3>
                            </Accordion.Content>
                        </Accordion>
                    </div>
                </PageTitle>
                <FullWidthSegment wrapper={2} options={['skinny']} className="elegant">
                    <p className="bold">Up to speed on crypto now?</p>
                    <p>
                        Great! OK so CryptoTrade allows you to bet on the performance of one or
                        more of the world’s leading crypto-currencies.
                    </p>
                    <p>
                        CryptoTrade harnesses pari-mutuel betting to pool together all bets across
                        all cryptocurrencies, and the winning pot of money is then shared amongst the winners.
                    </p>
                    <p className="bold">Example</p>
                    <p>Let’s say you wanted to bet 1 Eth on Bitcoin…</p>
                    <p>
                        99 other players happen to do the same, and they also bet 1 eth on Bitcoin
                        Including yourself, there are now a total of 100 players who have all bet
                        1 eth on Bitcoin. Therefore, you now own 1/100th or 1% of the Bitcoin Pot.
                    </p>
                    <p className="bold">Got all that?</p>
                    <p>
                        Ok so let’s now say that 100 other people each bet 1eth each on Ethereum,
                        another 100 people bet 1 eth each on Ripple, and another 100 people bet
                        1 eth each on Litecoin.
                    </p>
                    <p>
                        …In fact let’s just say that 100 people each bet 1 eth on the top
                        20 crypto-currencies
                    </p>
                    <p>
                        So we have 100 people for each of the top 20 crypto’s, or a total of 2,000
                        people.
                    </p>
                    <p>
                        That’s also 100 eth for every crypto, so a total of 2,000 eth in the betting
                        pot.
                    </p>
                    <p className="bold">Still with us?</p>
                    <p>
                        Right so to recap, you bet on Bitcoin, you own 1% of the Bitcoin pot, and
                        the total betting pot is 2000 Eth
                    </p>
                    <p>
                        After a week, a “winning crypto” is announced. Selecting a winning crypto is
                        very simple.
                    </p>
                    <ol>
                        <li>
                            We take the price of each crypto from www.coinmarketcap.com at the start
                            of the week.
                        </li>
                        <li>We take the price of each crypto once more at the end of the week</li>
                        <li>
                            We calculate the difference in price as a percentage, and this
                            represents the percentage increase
                        </li>
                        <li>
                            Whichever crypto performed the best by having the biggest relative
                            percentage increase over the week is the winner!
                        </li>
                    </ol>
                    <p>
                        So based on the example we are going with, Bitcoin happened to have a
                        fantastic week and its value increased by 6.42% and is declared the
                        winning crypto!
                    </p>
                    <p>
                        Well you bet 1 eth on Bitcoin, so congratulations, you were part of the
                        winning crypto pot!
                    </p>
                    <p className="bold">So what’s next?</p>
                    <p>
                        Well you own 1% of the winning pot, and the total pot was 2000 eth, so
                        here is how the total pot is distributed:
                    </p>
                    <ul>
                        <li>
                            95% of the total pot will be split amongst the players who were
                            part of the winning pot.
                        </li>
                        <li>
                            5% of the total pot gets sent to the dividend fund which will be shared
                            amongst the TOTE234 token holders.
                        </li>
                    </ul>

                    <p className="bold">How much do I get?</p>
                    <p>So you are entitled to a chunk of the 95% right… let’s do the math….</p>
                    <p>95% of 2000 eth is 1900 eth</p>
                    <p>
                        You own 1% of the winning pot, therefore you own 1% of the 1900 eth
                        that’s going to be distributed
                    </p>
                    <p>1% of 1900 eth is 19 eth</p>
                    <p>Congratulations! You just won 19eth!</p>

                    <p>
                        Ok that was a nice easy example, but what if the players each bet
                        unequal amounts?
                    </p>
                    <p>
                        Well lets say that you bet 5 eth on Bitcoin instead of 1 eth,
                        but everyone else just bet 1 eth. Well you bet more than everyone
                        else did, so quite rightly, you are entitled to a bigger chunk of
                        the winnings.
                    </p>
                    <p>So using the same example, you bet 5 eth but 99 other players bet 1 eth.</p>
                    <p>
                        Therefore the total amount bet on Bitcoin was 104 eth
                        5/104 = 0.0481
                        To get a percentage value, you simply multiply this value by 100
                        0.0481 x 100 = 4.81%
                        You therefore own 4.81% of the Bitcoin pot
                        So in terms of your entitlement of a total 1900 eth pot:
                        4.81% of 1900 is 91.39 eth!
                    </p>
                    <p className="bold">Anything else I need to know?</p>
                    <p>Well there are some simple rules to follow when playing CryptoTrade:</p>
                    <ol>
                        <li>Minimum single bet: {Settings.LOWEST_ETH} eth</li>
                        <li>Maximum single bet: {Settings.MAX_ETH} eth</li>
                        <li>Total maximum number of bets per crypto: {Settings.MAX_NR_OF_TRADES}</li>
                    </ol>
                    <p>
                        Anyone with a valid Ethereum wallet and enough eth can play the game during the standard trading period, which is currently set at 154 hours from the start of each game. At the 154th hour, the game is locked to everyone except Trade234 token holders.
                        Trade234 token holders are able to trade for an additional 4 hours after the standard trading window (up to the 158th hour)
                        After 158 hours the game is completely locked, and no further trades are accepted
                    </p>
                    <p>
                        PLEASE DO NOT ATTEMPT TO SEND ETH TO THE CRYPTO POT CONTRACTS
                        OUTSIDE OF THE OFFICIAL DAPP ON OUR WEBSITE
                    </p>
                    <p>
                        At the 166th hour, the game calls for a random number via <a
                        href="http://www.random.org">www.random.org</a> and the number will be between
                        1-300. This number represents a “delay period” in seconds and is the waiting
                        period to call the final price of all crypto’s. This added security measure
                        was introduced to maximise the complexity of any disreputable groups attempting
                        to affect market values of any specific crypto-currencies. Whilst it is possible
                        to momentarily cause crypto “ price spikes” for a few seconds, it is practically
                        impossible to coordinate this for sustained periods, and prices tend to revert
                        back to their natural levels. Our “RandomNumber” smart contract is fully open
                        to the public on our github page, so you are able to see exactly how we retrieve
                        the random number. We also discuss how the final price can be independently verified
                        using the coinmarketCap API.
                    </p>
                    <p>
                        Once the final prices are in, the smart contract cycles through every
                        Ethereum wall address (up to 1000 addresses) in the winning crypto pot,
                        and calculates the percentage owed to each address.
                    </p>
                    <p>
                        It then starts the transfer process of distributing the 95% amongst the
                        winners, and the remaining 5% is sent to the dividend fund. Once all
                        transfers have been made, the game resets, and is ready to play once more.
                    </p>
                    <p className="bold">What about the dividend?</p>
                    <p>
                        All TEST234 token holders are entitled to a share of the dividend fund.
                        This can be claimed on a quarterly basis, and the amount owed is correlated
                        to the number of tokens owned. For further details, please visit
                        our <Link href={Paths.getDividendFundPage()}><a>dividend page</a></Link>.
                    </p>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default HowItWorks;