import React, {Fragment} from "react";
import {AdContainer} from "./containers/AdContainer";

export const AdSidebar = () => {
    const AdPlaceholder = (
        <div className="display-4 lighter" style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            maxWidth: "250px",
            margin: "0 auto"
        }}>
            YOUR AD HERE:
            MOBILE 300x250
        </div>
    );

    return (
        <Fragment>
            <AdContainer className="bg-color-white glass">
                {AdPlaceholder}
            </AdContainer>
            <AdContainer className="bg-color-white glass">
                {AdPlaceholder}
            </AdContainer>
        </Fragment>
    );
};