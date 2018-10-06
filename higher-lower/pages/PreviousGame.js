import React, {Component, Fragment} from "react";
import Page from "../site-components/containers/Page";
import withMetamaskAccount from "../components/hocs/withMetamaskAccount";
import withContracts from "../site-components/hocs/withContracts";
import {compose} from "redux";
import settings from "../settings";
import moment from "moment";
moment.locale("en-gb");

class PreviousGame extends Component {
    renderPreviousContractInformation = (previousContract) => {
        return (
            <Fragment>
                <p className="mb-0">Contract address:</p>
                <p className="lighter"><a
                    target="_blank"
                    style={{wordBreak: "break-all"}}
                    href={`${settings.etherscanUrl}/address/${previousContract.address}`
                    }>{previousContract.address}</a></p>
                <p className="mb-0">Winning Number:</p>
                <p className="lighter">{previousContract.winningNumber}</p>
                <p className="mb-0">Last Guess Address:</p>
                <p className="lighter">{previousContract.lastGuessAddress}</p>
                <p className="mb-0">Game End Time:</p>
                <p className="lighter">{
                    moment(previousContract.gameEndTime).format("DD-MM-YYYY HH:mm:ss")
                }</p>
            </Fragment>
        );
    };

    render () {
        const {previousContract} = this.props;

        return (
            <Page contentClass="full-width">
                <h1>Previous Game</h1>
                {(Object.keys(previousContract).length === 0)
                    ? <p>No previous game exists</p>
                    : this.renderPreviousContractInformation(previousContract)}
            </Page>
        )
    }
}

export default compose(
    withMetamaskAccount,
    withContracts
)(PreviousGame);