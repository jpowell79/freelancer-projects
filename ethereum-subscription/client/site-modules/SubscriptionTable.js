import React, {Component, Fragment} from 'react';
import SortableTable from "../modules/SortableTable";
import {Pagination} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SubscriptionTable extends Component {
    static propTypes = {
        subscriptionContracts: PropTypes.array.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            head: [
                'Subscription',
                'Supplier',
                'Reputation',
                'Registration Age',
                'Wallet Age',
                'Free Trial',
                'Join Fee',
                'Exit Fee',
                'Contract Length',
                'Monthly Price',
                <th className="no-sort"/>
            ],
            body: [
                [
                    'Data 1', 'Data 2', 'Data 3', 'Data 1', 'Data 2',
                    'Data 3', 'Data 1', 'Data 2', 'Data 3', 'Data 3',
                    <td><button className="ui primary button">More Info</button></td>
                ],
                [
                    'Data 4', 'Data 2', 'Data 3', 'Data 1', 'Data 2',
                    'Data 3', 'Data 1', 'Data 2', 'Data 3', 'Data 3',
                    <td><button className="ui primary button">More Info</button></td>
                ],
                [
                    'Data 9', 'Data 2', 'Data 3', 'Data 1', 'Data 2',
                    'Data 3', 'Data 1', 'Data 2', 'Data 3', 'Data 3',
                    <td><button className="ui primary button">More Info</button></td>
                ],
                [
                    'Data 8', 'Data 2', 'Data 3', 'Data 1', 'Data 2',
                    'Data 3', 'Data 1', 'Data 2', 'Data 3', 'Data 3',
                    <td><button className="ui primary button">More Info</button></td>
                ],
                [
                    'Data 2', 'Data 2', 'Data 3', 'Data 1', 'Data 2',
                    'Data 3', 'Data 1', 'Data 2', 'Data 3', 'Data 3',
                    <td><button className="ui primary button">More Info</button></td>
                ],
            ],
            activePage: 1,
            totalPages: 10
        }
    }


    render(){
        return (
            <Fragment>
                <SortableTable
                    head={this.state.head}
                    body={this.state.body.filter((item, i) => i === this.state.activePage-1)}
                />
                <div className="text-center">
                    <Pagination
                        activePage={this.state.activePage}
                        onPageChange={(e, {activePage, totalPages}) => {
                            this.setState({activePage});
                        }}
                        totalPages={this.state.body.length}
                    />
                </div>
            </Fragment>
        );
    }
}

export default SubscriptionTable;