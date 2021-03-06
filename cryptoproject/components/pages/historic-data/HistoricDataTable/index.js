import React, {Component} from 'react';
import TableSorter from '../../../../services/TableSorter/index';
import {
    hideOnMobile,
    sortableTable
} from "../../../../services/cssUtils/index";
import Strings from '../../../../services/Strings/index';
import PropTypes from 'prop-types';
import $ from 'jquery';

class HistoricDataTable extends Component {
    static propTypes = {
        historicData: PropTypes.array.isRequired
    };

    componentDidMount(){
        this.tablesorter = new TableSorter($("#historic-data-table"));
    }

    componentWillUnmount(){
        this.tablesorter.turnOffSorting();
    }

    renderHistoricData(){
        return this.props.historicData.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{
                        Strings.toDateString(new Date(data.timestamp))
                    }</td>
                    <td>{data.name}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(data.startPrice)}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(data.finishPrice)}</td>
                    <td>{data.pot}</td>
                    <td>{data.nrOfBets}</td>
                </tr>
            );
        });
    }

    render(){
        return (
            <table id="historic-data-table" className={sortableTable()}>
                <thead>
                <tr>
                    <th>Created</th>
                    <th>Name</th>
                    <th className={hideOnMobile()}>Start Price</th>
                    <th className={hideOnMobile()}>Finish Price</th>
                    <th>Pot</th>
                    <th>Trades</th>
                </tr>
                </thead>
                <tbody>
                {(this.props.historicData.length > 0)
                    ? (
                        this.renderHistoricData()
                    ) : (
                        <tr>
                            <td colSpan={12}>
                                No historic data could be found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default HistoricDataTable;