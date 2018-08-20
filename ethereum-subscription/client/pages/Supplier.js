import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateSupplier from '../hocs/withAuthenticateSupplier';
import {Menu, Segment} from 'semantic-ui-react';
import objects from '../../services/objects';
import ManageProfile from "../site-modules/supplier-sections/ManageProfile";
import RequestContract from "../site-modules/supplier-sections/RequestContract";
import Subscriptions from "../site-modules/supplier-sections/Subscriptions";
import {classNames, joinClassNames} from "../services/className";

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

    renderSection = (activeSection) => {
        const {
            subscriptions,
            requestContract,
            manageProfile
        } = Supplier.sections;

        switch(activeSection){
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
        const {active} = this.state;
        const activeSection = objects.values(Supplier.sections)[active];
        const segmentClass = classNames({
            'widthless-mobile': activeSection === Supplier.sections.subscriptions
        });

        return (
            <Page>
                <FullWidthSegment className={joinClassNames('gray', segmentClass)} skinny wrapper={1}>
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
                    <Segment className={segmentClass}>
                        {this.renderSection(activeSection)}
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withAuthenticateSupplier(Supplier);