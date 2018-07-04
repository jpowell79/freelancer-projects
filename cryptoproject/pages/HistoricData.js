import React, {Component} from 'react';
import Page from '../components/containers/Page';
import HistoricDataTable from '../components/pages/historic-data/HistoricDataTable';
import HistoricDataSummary from '../components/pages/historic-data/HistoricDataSummary';
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

class HistoricData extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoadingHistoricData: true,
            historicData: []
        };
        
        this.downloadCsv = this.downloadCsv.bind(this);
        this.getBestValueCrypto = this.getBestValueCrypto.bind(this);
    }

    componentDidMount(){
        axios.get(urls.historicData).then(response => {
            this.setState({
                isLoadingHistoricData: false,
                historicData: response.data
            });
        }).catch(err => {
            AlertOptionPane.showErrorAlert({
                message: err.toString()
            });

            this.setState({
                isLoadingHistoricData: false
            });
        });
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
    
    render(){
        const {
            centered,
            bordered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page contentClass="historic-data">
                {(this.state.isLoadingHistoricData)
                    ? (
                        <FullWidthSegment options={[centered]}>
                            <Loader/>
                        </FullWidthSegment>
                    ) : (
                        <FullWidthSegment>
                            <HistoricDataTable historicData={this.state.historicData}/>
                        </FullWidthSegment>
                    )}
                {(this.state.historicData.length > 0)
                    ? (
                        <React.Fragment>
                            <FullWidthSegment options={[gray, bordered]} wrapper={1}>
                                <HistoricDataSummary
                                    bestValueCrypto={this.getBestValueCrypto()}
                                    totalNrOfTrades={this.state.historicData
                                        .map(data => data.nrOfTrades)
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
                            <FullWidthSegment options={[centered]} wrapper={4}>
                                <h2 className="centered title">Download CSV</h2>
                                <DateForm
                                    onSubmit={this.downloadCsv}
                                    submitText="Download CSV"
                                />
                            </FullWidthSegment>
                        </React.Fragment>
                    ) : null}
            </Page>
        );
    }
}

export default HistoricData;