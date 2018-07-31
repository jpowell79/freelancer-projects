import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateSupplier from '../config/withAuthenticateSupplier';
import {Menu} from 'semantic-ui-react';

class Supplier extends Component {
    static sections = [
        'Your Subscriptions',
        'Request New Contract',
        'Manage Your Profile'
    ];

    constructor(props){
        super(props);

        this.state = {
            active: 0
        }
    }

    renderSection = (active) => {
        switch(Supplier.sections[active]){
        case 'Your Subscriptions':
            return <p>Subscription</p>;
        case 'Request New Contract':
            return <p>Request</p>;
        case 'Manage Your Profile':
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
                <FullWidthSegment skinny>
                    <Menu compact>
                        {Supplier.sections.map((section, i) => {
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
                        })}
                    </Menu>
                </FullWidthSegment>
                <FullWidthSegment skinny>
                    {this.renderSection(active)}
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withAuthenticateSupplier(Supplier);