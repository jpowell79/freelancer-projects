import React from "react";

export const ContractStatus = ({contract}) => {
    let render = null;

    if(!contract.isActive){
        render = <p className="color-uiBlue">New</p>;
    } else if(contract.subscriptionCancelled){
        render = <p className="color-uiRed">Cancelled</p>;
    } else if(contract.subscriptionActive){
        render = <p className="color-uiGreen">Active</p>
    } else {
        render = <p className="color-uiYellow">Live</p>
    }

    return render;
};