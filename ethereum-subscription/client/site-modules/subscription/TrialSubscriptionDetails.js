import React, {Fragment} from "react";

export const TrialSubscriptionDetails = ({
    trialUsername,
    trialPassword,
    trialDurationInDays,
    supplierEmail,
    trialOther
}) => {
    return (
        <Fragment>
            <h2>Trial Subscription Details:</h2>
            <p className="text"><strong>Trial Username: </strong>{trialUsername}</p>
            <p className="text"><strong>Trial Password: </strong>{trialPassword}</p>
            <p className="text"><strong>Trial Duration (in days): </strong>{trialDurationInDays}</p>
            <p className="text"><strong>Supplier Email: </strong>{supplierEmail}</p>
            <p className="text"><strong>Trial Other: </strong>{trialOther}</p>
        </Fragment>
    );
};