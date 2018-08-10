import React, {Component} from 'react';
import {compose} from 'redux';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import SubscriptionTable from "../site-modules/SubscriptionTable";
import BackgroundSegment from "../containers/BackgroundSegment";
import paths from '../../services/constants/paths';
import {connect} from 'react-redux';
import withSubscriptionContracts from '../hocs/withSubscriptionContracts';
import SubscriptionFilters from "../site-modules/SubscriptionFilters";
import {filterSubscriptionContracts} from "../services/filters";
import {
    USE_DUMMY_SUBSCRIPTION_DATA,
    AMOUNT_OF_DUMMY_SUBSCRIPTION_DATA_TO_GENERATE,
    AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH
} from "../clientSettings";

class Index extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    state = {
        filters: {}
    };

    handleSubscriptionFormChange = (filterFormState) => {
        this.setState({filters: filterFormState});
    };

    componentDidMount(){
        this.props.loadAllContracts({
            amountToLoadPerBatch: AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH
        });
    }

    render () {
        const {settings} = this.props;

        return (
            <Page>
                <BackgroundSegment
                    imageUrl={`${paths.static.images}/${settings.homepageBanner.value}`}
                    className="parallax"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: settings.homepageBannerTextColor.value
                    }}
                    centered
                    wrapper={4}
                >
                    <h1 className="display-4">{settings.homepageBannerTitle.value}</h1>
                    <p className="text h2">{settings.homepageBannerText.value}</p>
                    <div className="overlay" style={{
                        backgroundColor: settings.homepageBannerOverlayColor.value
                    }}/>
                </BackgroundSegment>
                <FullWidthSegment noWidthPadding skinny>
                    <div className="wrapper-1">
                        <h2 className="text-center display-5">Subscriptions</h2>
                        <SubscriptionFilters
                            onChange={this.handleSubscriptionFormChange}
                        />
                    </div>
                    <SubscriptionTable
                        maxRows={parseInt(settings.homepageTableMaxRows.value, 10)}
                        subscriptionContracts={
                            filterSubscriptionContracts(
                                this.props.contracts,
                                this.state.filters
                            )
                        }
                    />
                </FullWidthSegment>
            </Page>
        )
    }
}

export default compose(
    withSubscriptionContracts({
        useDummyData: USE_DUMMY_SUBSCRIPTION_DATA,
        amountOfDummyDataToGenerate: AMOUNT_OF_DUMMY_SUBSCRIPTION_DATA_TO_GENERATE
    }),
    connect(Index.mapStateToProps)
)(Index);