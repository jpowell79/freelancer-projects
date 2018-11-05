import React, {Component} from "react";
import Page from "../containers/Page";
import FullWidthSegment from "../containers/FullWidthSegment";
import withAuthenticateAdmin from "../hocs/withAuthenticateAdmin";
import {compose} from "redux";
import withSubscriptionContracts from "../hocs/withSubscriptionContracts";
import {Menu, Segment, Grid} from "semantic-ui-react";
import objects from "../../services/datatypes/objects";
import Homepage from "../site-modules/admin-sections/Homepage";
import SiteIdentity from "../site-modules/admin-sections/SiteIdentity";
import MassEmail from "../site-modules/admin-sections/MassEmail";
import SuspendSuppliers from "../site-modules/admin-sections/SuspendSuppliers";
import AddContract from "../site-modules/admin-sections/AddContract";
import SmartContractData from "../site-modules/admin-sections/SmartContractData";
import AddContractType from "../site-modules/admin-sections/AddContractType";
import DatabaseBackup from "../site-modules/admin-sections/DatabaseBackup";
import ManageProfile from "../site-modules/shared-sections/ManageProfile";
import {
    AMOUNT_OF_DUMMY_SUBSCRIPTION_DATA_TO_GENERATE,
    AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH,
    USE_DUMMY_SUBSCRIPTION_DATA
} from "../clientSettings";
import DatabaseDataLoader from "../services/loaders/DatabaseDataLoader";
import UnsuspendSuppliers from "../site-modules/admin-sections/UnsuspendSuppliers";

class Admin extends Component {
    static sections = {
        addContract: "Add new contract to site",
        suspendSuppliers: "Suspend Suppliers",
        unsuspendSuppliers: "Unsuspend Suppliers",
        massEmail: "Mass Email to Suppliers",
        backupDatabase: "Backup Database",
        addContractType: "Add new contract type",
        homepage: "Homepage",
        smartContract: "Smart Contract Data",
        siteIdentity: "Site Identity",
        manageProfile: "Manage Your Profile"
    };

    constructor(props){
        super(props);

        this.hasLoadedAllContracts = this.props.subscriptionContracts.length ===
            this.props.liveSubscriptionContracts.length;

        this.state = {
            active: 0
        }
    }

    componentDidMount(){
        if(!this.hasLoadedAllContracts){
            return this.props.subscriptionContractLoader.loadAllContracts();
        }

        return new DatabaseDataLoader(this.props.dispatch, {
            suspendedUsers: true
        }).loadFromClientSide();
    }

    renderSection = (active) => {
        const {
            addContract,
            suspendSuppliers,
            unsuspendSuppliers,
            massEmail,
            backupDatabase,
            addContractType,
            homepage,
            smartContract,
            siteIdentity,
            manageProfile
        } = Admin.sections;

        switch(objects.values(Admin.sections)[active]){
        case addContract:
            return <AddContract {...this.props}/>;
        case suspendSuppliers:
            return <SuspendSuppliers {...this.props}/>;
        case unsuspendSuppliers:
            return <UnsuspendSuppliers {...this.props}/>
        case massEmail:
            return <MassEmail {...this.props}/>;
        case backupDatabase:
            return <DatabaseBackup {...this.props}/>;
        case addContractType:
            return <AddContractType {...this.props}/>;
        case homepage:
            return <Homepage {...this.props}/>;
        case smartContract:
            return <SmartContractData {...this.props}/>;
        case siteIdentity:
            return <SiteIdentity {...this.props}/>;
        case manageProfile:
            return <ManageProfile {...this.props}/>;
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

export default compose(
    withAuthenticateAdmin,
    withSubscriptionContracts({
        useDummyData: USE_DUMMY_SUBSCRIPTION_DATA,
        amountOfDummyDataToGenerate: AMOUNT_OF_DUMMY_SUBSCRIPTION_DATA_TO_GENERATE,
        amountToLoadPerBatch: AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH
    })
)(Admin);