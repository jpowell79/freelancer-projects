import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateSupplier from '../config/withAuthenticateSupplier';
import {Menu, Segment} from 'semantic-ui-react';
import objects from '../../services/objects';

class Supplier extends Component {
    static sections = {
        subscriptions: 'Your Subscriptions',
        requestContract: 'Request New Contract',
        manageProfile: 'Manage Your Profile'
    };

    constructor(props){
        super(props);

        this.state = {
            active: 0
        }
    }

    renderSection = (active) => {
        const {
            subscriptions,
            requestContract,
            manageProfile
        } = Supplier.sections;

        switch(objects.values(Supplier.sections)[active]){
        case subscriptions:
            return <p>Subscription</p>;
        case requestContract:
            return <p>Request</p>;
        case manageProfile:
            return <p>Manage</p>;
        default:
            return null;
        }
    };

    render () {
        const {
            active
        } = this.state;

        return (
            <Page>
                <FullWidthSegment className="gray" skinny>
                    <Menu compact>
                        {objects.values(Supplier.sections)
                            .map((section, i) => {
                                return (
                                    <Menu.Item
                                        key={i}
                                        link
                                        active={active === i}
                                        onClick={() => {
                                            this.setState({active: i});
                                        }}
                                    >{section}</Menu.Item>
                                );
                            })
                        }
                    </Menu>
                    <Segment>
                        {this.renderSection(active)}
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withAuthenticateSupplier(Supplier);