import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateSupplier from '../config/withAuthenticateSupplier';
import {Menu, Segment} from 'semantic-ui-react';
import objects from '../../services/objects';
import ManageProfile from "../site-modules/supplier-sections/ManageProfile";
import RequestContract from "../site-modules/supplier-sections/RequestContract";
import Subscriptions from "../site-modules/supplier-sections/Subscriptions";

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
            return <Subscriptions/>;
        case requestContract:
            return <RequestContract/>;
        case manageProfile:
            return <ManageProfile/>;
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
                <FullWidthSegment className="gray" skinny wrapper={1}>
                    <Menu fluid stackable>
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