import React from 'react';
import {joinClassNames} from "../utils";

let changedClasses = new Map();

export const CoinMarketFlashCell = ({keyName = "", value, prevValue, addColor = false, children}) => {
    function valueComparator(currentData, prevData){
        if(prevData === undefined){
            return 0;
        }

        if (currentData > prevData) {
            if(keyName !== ""){
                changedClasses.set(keyName, "color-uiGreen");
            }
            return 1;
        } else if (currentData < prevData){
            if(keyName !== ""){
                changedClasses.set(keyName, "color-uiRed");
            }
            return -1;
        } else {
            return 0;
        }
    }

    function getValueClass(value){
        if(changedClasses.has(keyName)){
            return changedClasses.get(keyName);
        }

        if(!addColor){
            return "";
        }

        if(value === 0){
            return "";
        }

        return value > 0 ? "color-uiGreen" : "color-uiRed";
    }

    let compareValue = valueComparator(value, prevValue);

    if(compareValue === 0){
        return (
            <span className={joinClassNames("flash-cell", getValueClass(value))}>
                {children}
            </span>
        );
    } else if (compareValue === 1) {
        return (
            <span className="color-uiGreen flash-cell--green">
                {children}
            </span>
        );
    }

    return (
        <span className="color-uiRed flash-cell--red">
            {children}
        </span>
    );
};