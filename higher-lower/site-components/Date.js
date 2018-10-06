import React from "react";
import moment from "moment";
moment.locale("en-gb");

export const Date = ({unixTime, format = "DD-MM-YYYY HH:mm:ss"}) => {
    return (
        <span>{moment(unixTime).format(format)}</span>
    );
};