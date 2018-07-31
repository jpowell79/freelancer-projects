import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import SubscriptionTable from "../site-modules/SubscriptionTable";
import BackgroundSegment from "../containers/BackgroundSegment";
import paths from '../../services/constants/paths';
import {connect} from 'react-redux';

class Index extends Component {
    static mapStateToProps = ({settings}) => ({settings});

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
                    <SubscriptionTable/>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default connect(Index.mapStateToProps)(Index);