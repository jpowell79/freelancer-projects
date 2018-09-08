import React, {Fragment} from 'react';

export const SubscriptionDetails = ({
    username,
    password,
    subscriptionLengthInWeeks,
    supplierEmail,
    other
}) => {
    return (
        <Fragment>
            <h2>Subscription Details:</h2>
            <p className="text"><strong>Username: </strong>{username}</p>
            <p className="text"><strong>Password: </strong>{password}</p>
            <p className="text"><strong>Subscription Length (in weeks): </strong>{subscriptionLengthInWeeks}</p>
            <p className="text"><strong>Supplier Email: </strong>{supplierEmail}</p>
            <p className="text"><strong>Other: </strong>{other}</p>
        </Fragment>
    );
};