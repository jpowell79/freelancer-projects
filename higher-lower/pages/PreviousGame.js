import React, {Component} from "react";
import {connect} from "react-redux";
import Page from "../site-components/page/Page";
import withMetamaskAccount from "../components/hocs/withMetamaskAccount";
import withContracts from "../site-components/hocs/withContracts";
import {compose} from "redux";
import settings from "../settings";
import {Address} from "../site-components/Address";
import {Moment} from "../components/Moment";
import {Space} from "../components/Space";

class PreviousGame extends Component {
    static mapStateToProps = ({dangerMode}) => ({dangerMode});

    renderPreviousContractInformation = (previousContract) => {
        return (
            <table className="list-table">
                <tbody>
                    <tr>
                        <td>Contract address:</td>
                        <td><a
                            target="_blank"
                            href={`${settings.etherscanUrl}/address/${previousContract.address}`
                            }><Address address={previousContract.address}/></a></td>
                    </tr>
                    <tr>
                        <td>Winning Number:</td>
                        <td>{previousContract.winningNumber}</td>
                    </tr>
                    <tr>
                        <td>Last Guess Address:</td>
                        <td><Address address={previousContract.lastGuessAddress}/></td>
                    </tr>
                    <tr>
                        <td>Game End Time:</td>
                        <td><Moment unixTime={previousContract.gameEndTime}/></td>
                    </tr>
                </tbody>
            </table>
        );
    };

    render () {
        const {previousContract} = this.props;

        return (
            <Page header={<Space danger={this.props.dangerMode}/>} contentClass="full-width">
                <div className="glass container bg-color-white br-5">
                    <h1 className="normal display-6">Previous Game</h1>
                    {(Object.keys(previousContract).length === 0)
                        ? <p>No previous game exists</p>
                        : this.renderPreviousContractInformation(previousContract)}
                </div>
            </Page>
        )
    }
}

export default compose(
    withMetamaskAccount,
    withContracts,
    connect(PreviousGame.mapStateToProps)
)(PreviousGame);