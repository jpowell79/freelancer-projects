import React, {Component, Fragment} from 'react';
import Paths from "../../../../services/Paths";
import Files from "../../../../services/Files";
import {TokenCountdown} from '../TokenCountdown';
import FullWidthSegment from "../../../containers/FullWidthSegment";
import TokenPurchase from '../TokenPurchase';
import HideFragment from "../../../modules/HideFragment";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Countdown = ({title, completeTime, children, onComplete}) => {
    return (
        <div className="text-center">
            <HideFragment>
                <TokenCountdown
                    title={title}
                    date={completeTime}
                    onCountdownZero={onComplete}/>
                {children}
            </HideFragment>
        </div>
    );
};

const EthRaised = ({amountRaised, maximumRaised}) => {
    return (
        <div className="ui describing error progress">
            <h3 className="description normal">
                Raised: <span className="bold">
                    {amountRaised}
                </span>
            </h3>
            <div className="bar" style={{
                width: `${(amountRaised/maximumRaised)*100}%`
            }}/>
            <h3 className="start normal">0 ETH</h3>
            <h3 className="end normal">{maximumRaised} ETH</h3>
        </div>
    );
};

const WhitePaperButton = () => {
    return (
        <button
            className="ui large primary button"
            onClick={() => {
                Files.open(Paths.getFile({
                    name: 'whitepaper',
                    type: 'pdf'
                }));
            }}
        >Whitepaper</button>
    );
};

export const PreIcoLaunch = ({onComplete, preIcoPhaseCountdown}) => {
    return (
        <Countdown
            title="Token Launch Start"
            completeTime={preIcoPhaseCountdown}
            onComplete={onComplete}>
            <WhitePaperButton/>
        </Countdown>
    );
};


export const IcoLaunch = ({amountRaised, maximumRaised, onComplete, icoPhaseCountdown}) => {
    const {
        skinny,
        noWidthPadding
    } = FullWidthSegment.options;

    return (
        <Countdown
            title="Token Sale Ends"
            completeTime={icoPhaseCountdown}
            onComplete={onComplete}>
            <div className="wrapper-4">
                <TokenPurchase/>
                <FullWidthSegment options={[skinny, noWidthPadding]} className="no-padding-bottom">
                    <EthRaised
                        amountRaised={amountRaised}
                        maximumRaised={maximumRaised}
                    />
                    <WhitePaperButton/>
                </FullWidthSegment>
            </div>
        </Countdown>
    );
};

export const PostIcoLaunch = ({amountRaised, maximumRaised, postIcoCountdown, onComplete}) => {
    return (
        <Countdown
            title="Token Sale Complete"
            completeTime={postIcoCountdown}
            onComplete={onComplete}>
            <div className="wrapper-4">
                <EthRaised
                    amountRaised={amountRaised}
                    maximumRaised={maximumRaised}
                />
                <WhitePaperButton/>
            </div>
        </Countdown>
    )
};

class LaunchPhase extends Component {
    static mapStateToProps({tokenSale}){
        return {tokenSale};
    }

    static propTypes = {
        onComplete: PropTypes.func.isRequired
    };

    render(){
        const {tokenSale} = this.props;
        const renderPreIcoLaunch = (
            tokenSale.preIcoPhaseCountdown > Date.now() + 1000
        );
        const renderIcoLaunch = (
            tokenSale.icoPhaseCountdown > Date.now() + 1000
            && !renderPreIcoLaunch
        );
        const renderPostIcoLaunch = (
            tokenSale.postIcoCountdown > Date.now() + 1000 &&
            !renderIcoLaunch &&
            !renderPreIcoLaunch
        );

        return (
            <Fragment>
                {(renderPreIcoLaunch) && (
                    <PreIcoLaunch
                        {...tokenSale}
                        onComplete={() => {
                            this.forceUpdate();
                        }}
                    />
                )}
                {(renderIcoLaunch) && (
                    <IcoLaunch
                        {...tokenSale}
                        onComplete={() => {
                            this.forceUpdate();
                        }}
                    />
                )}
                {(renderPostIcoLaunch) && (
                    <PostIcoLaunch
                        {...tokenSale}
                        onComplete={() => {
                            this.props.onComplete();
                        }}
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(LaunchPhase.mapStateToProps)(LaunchPhase);