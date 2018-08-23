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
import Slideshow from '../containers/Slideshow';
import {LoaderTiny} from "../modules/icons";
import {Notice} from '../modules/Notice';

class Index extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    state = {
        filters: {},
        noticeOpen: true
    };

    handleSubscriptionFormChange = (filterFormState) => {
        this.setState({filters: filterFormState});
    };

    componentDidMount(){
        this.props.loadAllContracts({
            amountToLoadPerBatch: AMOUNT_OF_SUBSCRIPTION_DATA_TO_LOAD_PER_BATCH
        }).then(() => {
            this.setState({noticeOpen: false})
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
                        color: settings.homepageBannerTextColor.value,
                        minHeight: "375px"
                    }}
                    centered
                >
                    <Slideshow
                        className="wrapper-3"
                        animation={settings.homepageSlideshowAnimation.value}
                    >
                        <div className="wrapper-4">
                            <h1 className="title">Ethereum Subscriptions</h1>
                            <p className="text">
                                Take out a subscription to a service, and pay for the service
                                using Ethereum, with a public record of the terms of the
                                contract and an easy way to request a subscription cancellation
                                if it ever becomes necessary.
                            </p>
                        </div>
                        <div className="wrapper-4">
                            <h2 className="title">Slide 2</h2>
                            <p className="text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                congue justo purus, pharetra finibus odio pellentesque imperdiet.
                                Duis finibus viverra lectus non bibendum. In quis euismod urna,
                                sit amet tincidunt mauris. Aliquam vel lectus vitae orci imperdiet
                                faucibus. Interdum et malesuada fames ac ante ipsum primis in
                                faucibus.
                            </p>
                        </div>
                        <div className="wrapper-4">
                            <h2 className="title">Slide 3</h2>
                            <p className="text">
                                Nam ultricies, nulla sit amet auctor euismod, mauris
                                enim mattis nisl, nec dapibus nisi velit sit amet turpis.
                                Morbi posuere rhoncus leo, eu sodales enim ullamcorper et.
                            </p>
                        </div>
                    </Slideshow>
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
                            ).filter(contract => contract.isActive)
                        }
                    />
                </FullWidthSegment>
                <Notice open={this.state.noticeOpen}>
                    <div style={{display: "flex"}}>
                        <span className="lighter h3" style={{
                            marginRight: "15px"
                        }}>Loading contracts...</span>
                        <LoaderTiny/>
                    </div>
                </Notice>
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