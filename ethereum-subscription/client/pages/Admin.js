import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticateAdmin from '../config/withAuthenticateAdmin';
import {Menu, Segment, Grid} from 'semantic-ui-react';
import objects from '../../services/objects';
import HomepageBanner from "../site-modules/admin-sections/HomepageBanner";
import SiteIdentity from "../site-modules/admin-sections/SiteIdentity";
import MassEmail from "../site-modules/admin-sections/MassEmail";
import SuspendSuppliers from "../site-modules/admin-sections/SuspendSuppliers";
import AddContract from "../site-modules/admin-sections/AddContract";

class Admin extends Component {
    static sections = {
        addContract: 'Add new contract to site',
        suspendSuppliers: 'Suspend Suppliers',
        massEmail: 'Mass Email to Suppliers',
        backupDatabase: 'Backup Database',
        addSubCategory: 'Add new Sub Category',
        homepageBanner: 'Homepage Banner',
        smartContract: 'Smart Contract Data',
        siteIdentity: 'Site Identity'
    };

    constructor(props){
        super(props);

        this.state = {
            active: 0
        }
    }

    renderSection = (active) => {
        const {
            addContract,
            suspendSuppliers,
            massEmail,
            backupDatabase,
            addSubCategory,
            homepageBanner,
            smartContract,
            siteIdentity
        } = Admin.sections;

        switch(objects.values(Admin.sections)[active]){
        case addContract:
            return <AddContract/>;
        case suspendSuppliers:
            return <SuspendSuppliers/>;
        case massEmail:
            return <MassEmail/>;
        case backupDatabase:
            return <p>Backup</p>;
        case addSubCategory:
            return <p>Sub Category</p>;
        case homepageBanner:
            return <HomepageBanner/>;
        case smartContract:
            return <p>Smart Contract</p>;
        case siteIdentity:
            return <SiteIdentity/>;
        default:
            return null;
        }
    };

    render () {
        const {active} = this.state;

        return (
            <Page>
                <FullWidthSegment className="gray" skinny wrapper={1}>
                    <Grid stackable>
                        <Grid.Column width={5}>
                            <Menu fluid vertical>
                                {objects.values(Admin.sections)
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
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Segment>
                                {this.renderSection(active)}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withAuthenticateAdmin(Admin);