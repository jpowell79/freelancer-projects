import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import SubscriptionTable from "../site-modules/SubscriptionTable";
import BackgroundSegment from "../containers/BackgroundSegment";
import paths from '../../services/constants/paths';
import {connect} from 'react-redux';
import withSubscriptionContracts from '../hocs/withSubscriptionContracts';
import SubscriptionFilters from "../site-modules/SubscriptionFilters";
import {filterSubscriptionContracts} from "../services/filters";

class Index extends Component {
    static mapStateToProps = ({settings}) => ({settings});
    state = {
        filters: {}
    };

    handleSubscriptionFormChange = (filterFormState) => {
        this.setState({filters: filterFormState});
    };

    render () {
        const {
            settings,
            liveSubscriptionContracts
        } = this.props;

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
                        maxRows={25}
                        subscriptionContracts={
                            filterSubscriptionContracts(
                                liveSubscriptionContracts,
                                this.state.filters
                            )
                        }
                    />
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withSubscriptionContracts({useDummyData: true})(connect(Index.mapStateToProps)(Index));