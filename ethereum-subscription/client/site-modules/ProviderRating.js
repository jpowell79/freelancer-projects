import React from 'react';
import {Star} from "../modules/icons";

export const ProviderRating = ({reputation = 0, name}) =>{
    if(reputation < 2){
        return <span>{name}</span>;
    } else if(reputation <= 10){
        return (
            <span>
                <span style={{marginRight: "5px"}}>{name}</span>
                <Star className="color-uiGreen"/>
            </span>
        );
    } else if(reputation <= 50){
        return (
            <span>
                <span style={{marginRight: "5px"}}>{name}</span>
                <Star className="color-uiBlue"/>
            </span>
        );
    } else if(reputation <= 100){
        return (
            <span>
                <span style={{marginRight: "5px"}}>{name}</span>
                <Star className="color-uiPurple"/>
            </span>
        );
    } else if(reputation <= 250){
        return (
            <span>
                <span style={{marginRight: "5px"}}>{name}</span>
                <Star className="color-uiYellow"/>
            </span>
        );
    } else if(reputation <= 499){
        return (
            <span>
                <span style={{marginRight: "5px"}}>{name}</span>
                <span style={{whiteSpace: "nowrap"}}>
                    <Star className="color-uiYellow"/>
                    <Star className="color-uiYellow"/>
                </span>
            </span>
        );
    }

    return (
        <span>
            <strong style={{marginRight: "5px"}}>{name}</strong>
            <span style={{whiteSpace: "nowrap"}}>
                <Star className="color-uiYellow"/>
                <Star className="color-uiYellow"/>
            </span>
        </span>
    );
};