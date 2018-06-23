import React, {Component} from 'react';
import urls from '../../server/services/utils/urls';
import axios from 'axios';
import AlertOptionPane from "../Alert/AlertOptionPane";
import TableSorter from '../TableSorter';
import {LoaderSmall} from "../icons";
import {
    hideOnMobile,
    sortableTable,
    titledSegmentHeader,
    titledSegmentContent
} from "../utils/cssUtils";
import CsvParser from '../../server/services/CsvParser';
import moment from 'moment';
import Strings from '../utils/Strings';
import ComparisonTable from './ComparisonTable';
import DateForm from '../forms/DateForm';
import Files from '../utils/Files'
import $ from 'jquery';

class HistoricDataTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoadingHistoricData: true,
            historicData: []
        };

        this.renderHistoricData = this.renderHistoricData.bind(this);
        this.downloadCsv = this.downloadCsv.bind(this);
    }

    componentDidMount(){
        new TableSorter($("#historic-data-table"));

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

    renderHistoricData(){
        return this.state.historicData.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{
                        Strings.toDateTimeString(
                            new Date(data.timestamp)
                        )
                    }</td>
                    <td>{data.name}</td>
                    <td>{Strings.toUSD(data.startPrice)}</td>
                    <td>{Strings.toUSD(data.finishPrice)}</td>
                    <td className={hideOnMobile()}>{data.pot}</td>
                    <td className={hideOnMobile()}>{data.nrOfTrades}</td>
                </tr>
            );
        });
    }

    render(){
        return (
            <div>
                <table id="historic-data-table" className={sortableTable()}>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Name</th>
                            <th>Start Price</th>
                            <th>Finish Price</th>
                            <th className={hideOnMobile()}>Pot size</th>
                            <th className={hideOnMobile()}>Nr. Trades</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(this.state.isLoadingHistoricData)
                        ? (
                            <tr>
                                <td colSpan={12}>
                                    <LoaderSmall/>
                                </td>
                            </tr>
                        )
                        : (this.state.historicData.length > 0)
                            ? (
                                this.renderHistoricData()
                            ) : (
                                <tr>
                                    <td colSpan={12}>
                                        No historic data could be found.
                                    </td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
                {(this.state.historicData.length > 0)
                    ? (
                        <div className="ui padded stackable centered grid unstack-md two-column">
                            <div className="eight wide column">
                                <h2 className={titledSegmentHeader()}>
                                    Summary
                                </h2>
                                <div className={titledSegmentContent()}>
                                    <ComparisonTable
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
                                </div>
                            </div>
                            <div className="eight wide column">
                                <h2 className={titledSegmentHeader()}>
                                    Download historic data
                                </h2>
                                <div className={titledSegmentContent()}>
                                    <DateForm
                                        onSubmit={this.downloadCsv}
                                        submitText="Download CSV"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
            </div>
        );
    }
}

export default HistoricDataTable;