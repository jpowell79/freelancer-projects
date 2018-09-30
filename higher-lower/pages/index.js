import React, {Component, Fragment} from "react";
import Page from "../site-components/containers/Page";
import {AdContainer} from "../site-components/containers/AdContainer";

class Index extends Component {
    render () {
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
                <h2 className="display-6">Game Number </h2>
                <h1>Hello Next, Redux, React, SCSS and Jest setup!</h1>
            </Page>
        )
    }
}

export default Index;