import React, {Component, Fragment} from "react";
import Page from "../site-components/containers/Page";
import {AdContainer} from "../site-components/containers/AdContainer";
import withFactoryContract from "../hocs/withFactoryContract";
import withTemplateContract from "../hocs/withTemplateContract";
import {compose} from "redux";
import {connect} from "react-redux";

class Index extends Component {
    static mapStateToProps = ({factoryContract}) => ({factoryContract});

    render () {
        const {
            factoryContract
        } = this.props;

        return (
            <Page
                sidebar={
                    <Fragment>
                        <AdContainer className="bg-color-bBlue">
                            <div className="display-5" style={{maxWidth: "250px", margin: "0 auto"}}>
                                YOUR AD HERE:
                                MOBILE 300x250
                            </div>
                        </AdContainer>
                        <AdContainer className="bg-color-bBlue">
                            <div className="display-5" style={{maxWidth: "250px", margin: "0 auto"}}>
                                YOUR AD HERE:
                                MOBILE 300x250
                            </div>
                        </AdContainer>
                    </Fragment>
                }
            >
                <h2 className="display-6">Game Number {factoryContract.count}</h2>
                <h1>Hello Next, Redux, React, SCSS and Jest setup!</h1>
            </Page>
        )
    }
}

export default compose(
    withFactoryContract,
    withTemplateContract("0x6dbaEa5167cF533392DC7fa145c409b79fCCb88b"),
    connect(Index.mapStateToProps)
)(Index);