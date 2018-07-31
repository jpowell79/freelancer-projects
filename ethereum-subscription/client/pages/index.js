import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import SubscriptionTable from "../site-modules/SubscriptionTable";
import BackgroundSegment from "../containers/BackgroundSegment";
import paths from '../../services/paths';
import {connect} from 'react-redux';

class Index extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    render () {
        const {settings} = this.props;

        return (
            <Page>
                <BackgroundSegment
                    imageUrl={`${paths.static.images}/${settings.homepageBanner.value}`}
                    className="parallax color-white"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    centered
                    wrapper={4}
                >
                    <h1 className="display-4">Ethereum Subscription</h1>
                    <p className="text h2">
                        Take out a subscription to a service, and pay for the service
                        using Ethereum, with a public record of the terms of the
                        contract and an easy way to request a subscription cancellation
                        if it ever becomes necessary.
                    </p>
                    <div className="overlay" style={{
                        backgroundColor: settings.homepageBannerOverlayColor.value
                    }}/>
                </BackgroundSegment>
                <FullWidthSegment noWidthPadding skinny>
                    <SubscriptionTable/>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default connect(Index.mapStateToProps)(Index);