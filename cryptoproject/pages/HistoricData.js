import React, {Component, Fragment} from 'react';
import Page from '../components/containers/Page';
import HistoricDataTable from '../components/pages/historic-data/HistoricDataTable';
import HistoricDataSummary from '../components/pages/historic-data/HistoricDataSummary';
import AccountDetails from '../components/pages/trading/AccountDetails';
import DateForm from '../components/modules/forms/DateForm';
import axios from "axios/index";
import AlertOptionPane from "../services/Alert/AlertOptionPane";
import urls from "../server/services/utils/urls";
import Files from "../services/Files";
import moment from "moment/moment";
import {Loader} from "../components/modules/icons";
import {calcTotalPercentChange} from "../services/cryptoUtils";
import CsvParser from "../server/services/CsvParser";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import Dispatcher from "../services/Dispatcher";
import {connect} from 'react-redux';
import Strings from "../services/Strings";
import Settings from '../site-settings';
import {PageTitle} from "../components/modules/PageTitle";
import Web3 from '../server/services/Web3';

class HistoricData extends Component {
    static async getInitialProps({reduxStore, hasDatabase}){
        let dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.updateTokenHolderClaim();
        return {hasDatabase};
    }

    constructor(props){
        super(props);

        this.state = {
            isLoadingHistoricData: true,
            historicData: []
        };
        
        this.downloadCsv = this.downloadCsv.bind(this);
        this.getBestValueCrypto = this.getBestValueCrypto.bind(this);
        this.renderHistoricData = this.renderHistoricData.bind(this);
    }

    componentDidMount(){
        if(this.props.hasDatabase){
            axios.get(urls.historicData).then(response => {
                this.setState({
                    isLoadingHistoricData: false,
                    historicData: response.data
                });
            }).catch(err => {
                console.error(err);

                this.setState({
                    isLoadingHistoricData: false
                });
            });
        }
    }

    static renderNoAccessMessage(){
        return (
            <div className="text-center">
                <h2>The Historical data service is provided for {Settings.TOKEN_NAME} token holders only.</h2>
                <p className="h4">
                    Unfortunately, we are unable to detect that you possess any tokens.
                    Please ensure you are logged into MetaMask and that your wallet
                    address contains tokens to use this service.
                </p>
            </div>
        );
    }

    downloadCsv(startDate, endDate){
        let start = parseInt(startDate.format('YYYYMMDD'), 10);
        let end = parseInt(endDate.format('YYYYMMDD'), 10);

        let convertToCsv = this.state.historicData.filter(data => {
            let timestamp = parseInt(moment(data.timestamp).format('YYYYMMDD'));

            return (timestamp >= start) && (timestamp <= end);
        }).map(data => {
            return Object.assign({}, data, {
                date: parseInt(moment(data.timestamp).format('YYYYMMDD'))
            })
        });

        axios.get(`${urls.archivedHistoricData}/${start}-${end}`)
            .then(response => {
                response.data.forEach(data => {
                    convertToCsv.push(data);
                });

                if(convertToCsv.length > 0){
                    Files.downloadCsv(CsvParser.parse(convertToCsv), `historic-data`);
                } else {
                    AlertOptionPane.showInfoAlert({
                        message: "No historical data between the given dates could be found."
                    });
                }
            });
    }

    getBestValueCrypto(){
        return this.state.historicData.map(data => {

            let value = calcTotalPercentChange(
                data.startPrice, data.finishPrice
            );

            return {
                name: data.name,
                value: parseFloat(value)
            }
        }).reduce((accumulator, current) => {
            if(accumulator.value === undefined){
                return current;
            }

            if(isNaN(current.value)){
                return accumulator;
            }

            if(accumulator.value < current.value){
                return current;
            }

            return accumulator;
        });
    }

    renderHistoricData(){
        const {
            centered,
            bordered,
            noWidthPadding
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        if(!this.props.hasDatabase){
            return (
                <FullWidthSegment options={[noWidthPadding]}>
                    <HistoricDataTable historicData={[]}/>
                </FullWidthSegment>
            );
        }

        return (
            <Fragment>
                {(this.state.isLoadingHistoricData)
                    ? (
                        <FullWidthSegment options={[centered]}>
                            <Loader/>
                        </FullWidthSegment>
                    ) : (
                        <FullWidthSegment options={[noWidthPadding]}>
                            <HistoricDataTable
                                historicData={this.state.historicData}
                            />
                        </FullWidthSegment>
                    )}
                {(this.state.historicData.length > 0)
                    ? (
                        <Fragment>
                            <FullWidthSegment options={[gray, bordered]} wrapper={1}>
                                <HistoricDataSummary
                                    tokenHolderClaim={this.props.tokenHolderClaim}
                                    bestValueCrypto={this.getBestValueCrypto()}
                                    totalnrOfBets={this.state.historicData
                                        .map(data => data.nrOfBets)
                                        .reduce((accumulator, currentValue) => {
                                            return accumulator + currentValue;
                                        })
                                    }
                                    totalPotSize={parseFloat(this.state.historicData
                                        .map(data => data.pot)
                                        .reduce((accumulator, currentValue) => {
                                            return accumulator + currentValue;
                                        }).toFixed(2))
                                    }
                                />
                            </FullWidthSegment>
                            {Web3.hasMetaMask() && (
                                <FullWidthSegment options={[centered]} wrapper={4}>
                                    <h2 className="centered title">Download CSV</h2>
                                    <DateForm
                                        onSubmit={this.downloadCsv}
                                        submitText="Download CSV"
                                    />
                                </FullWidthSegment>
                            )}
                        </Fragment>
                    ) : null}
            </Fragment>
        );
    }
    
    render(){
        const {
            bordered,
            skinny
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page contentClass="historic-data">
                <PageTitle title="Historic Data"/>
                <FullWidthSegment options={[gray, bordered, skinny]} wrapper={2}>
                    <div className="ui padded segment">
                        <AccountDetails
                            titleElement={<h2 className="h3">Your Account Details</h2>}
                            renderer={(account, renderDetails) => {
                                if(account.tradeTokens > 0){
                                    return renderDetails();
                                }

                                return HistoricData.renderNoAccessMessage();
                            }}
                            onErrorRenderer={HistoricData.renderNoAccessMessage}
                        />
                    </div>
                </FullWidthSegment>
                {
                    ((this.props.account.tradeTokens > 0) &&
                    Strings.isDefined(this.props.account.address))
                        ? this.renderHistoricData() : null
                }
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        tokenHolderClaim,
        account
    } = state;

    return {
        tokenHolderClaim,
        account
    };
};

export default connect(mapStateToProps)(HistoricData);