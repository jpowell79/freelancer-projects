import React, {Component} from 'react';
import Page from '../components/Page';
import HistoricDataTable from '../components/HistoricDataTable';

class HistoricData extends Component {
    render(){
        return (
            <Page fetchMarketData={false}
                  addTimer={false}
                  contentClass="historic-data wrapper">
                <HistoricDataTable/>
            </Page>
        );
    }
}

export default HistoricData;