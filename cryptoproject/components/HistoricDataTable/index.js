import React, {Component} from 'react';
import urls from '../../server/services/urls';
import axios from 'axios';
import AlertOptionPane from "../Alert/AlertOptionPane";
import TableSorter from '../TableSorter';
import {LoaderSmall} from "../icons";
import {hideOnMobile} from "../utils/cssUtils";
import Strings from '../utils/Strings';
import SubTable from './SubTable';
import $ from 'jquery';

class HistoricDataTable extends Component {
    state = {
        historicData: []
    };

    componentDidMount(){
        new TableSorter($("#historic-data-table"));

        axios.get(urls.historicalData).then(response => {
            this.setState({historicData: response.data});
        }).catch(err => {
            AlertOptionPane.showErrorAlert({
                message: err.toString()
            });
        });
    }

    render(){
        if(this.state.historicData.length > 0)
            console.log();

        return (
            <div>
                <table id="historic-data-table" className="ui unstackable selectable sortable very compact celled small table">
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
                    {(this.state.historicData.length === 0)
                        ? (
                            <tr>
                                <td colSpan={12}>
                                    <LoaderSmall/>
                                </td>
                            </tr>
                        )
                        : (
                            this.state.historicData.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{
                                            Strings.toDateTimeString(
                                                new Date(data.createdAt)
                                            )
                                        }</td>
                                        <td>{data.name}</td>
                                        <td>{data.startPrice}</td>
                                        <td>{data.finishPrice}</td>
                                        <td className={hideOnMobile()}>{data.potSize}</td>
                                        <td className={hideOnMobile()}>{data.nrOfTrades}</td>
                                    </tr>
                                );
                            })
                        )
                    }
                    </tbody>
                </table>
                {(this.state.historicData.length > 0)
                    ? (
                        <SubTable
                            totalNrOfTrades={this.state.historicData
                                .map(data => data.nrOfTrades)
                                .reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue;
                                })
                            }
                            totalPotSize={parseFloat(this.state.historicData
                                .map(data => data.potSize)
                                .reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue;
                                }).toFixed(2))
                            }/>
                    ) : null}
            </div>
        );
    }
}

export default HistoricDataTable;