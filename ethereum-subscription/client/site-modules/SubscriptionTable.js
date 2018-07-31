import React, {Component, Fragment} from 'react';
import SortableTable from "../modules/SortableTable";
import {Grid, Form, Pagination, Segment} from 'semantic-ui-react';

class SubscriptionTable extends Component {
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
                <div className="wrapper-1">
                    <h2 className="text-center display-5">Subscriptions</h2>
                    <Grid stackable className="unstack-md">
                        <Grid.Column width={9}>
                            <Segment>
                                <p className="bold">Show the following subscription types:</p>
                                <Form>
                                    <Form.Group widths={3}>
                                        <Form.Checkbox
                                            label="Gym Membership"
                                        />
                                        <Form.Checkbox
                                            label="IPTV Subscription"
                                        />
                                        <Form.Checkbox
                                            label="Other"
                                        />
                                    </Form.Group>
                                    <Form.Group widths={3}>
                                        <Form.Checkbox
                                            label="Magazine Subscription"
                                        />
                                        <Form.Checkbox
                                            label="Website Membership"
                                        />
                                        <Form.Checkbox
                                            label="Tick/Untick All"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Checkbox
                                            label="Show currently active subscriptions"
                                        />
                                    </Form.Group>
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment>
                                <p className="bold">Additional Subscription Filters:</p>
                                <Form>
                                    <Form.Group widths={2}>
                                        <Form.Checkbox
                                            label="Show with Join Fee?"
                                        />
                                        <Form.Checkbox
                                            label="Show with Exit Fee?"
                                        />
                                    </Form.Group>
                                    <Form.Group widths={2}>
                                        <Form.Checkbox
                                            label="Show with zero Reputation?"
                                        />
                                        <Form.Checkbox
                                            label="Tick/Untick All"
                                        />
                                    </Form.Group>
                                    <div>
                                        <Form.Field
                                            label="Search Subscription by Tx Hash:"
                                            control="input"
                                            style={{width: "100%"}}
                                        />
                                    </div>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <div className="divider-3 padder-3">
                        <Form>
                            <Form.Group widths={2}>
                                <div className="field" style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
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