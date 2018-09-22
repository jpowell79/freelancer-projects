import React from "react";
import {animationTypes} from "../services/constants/animationTypes";
import {Dropdown} from "semantic-ui-react";

export const AnimationDropdown = ({...props}) => {
    const options = animationTypes.map(type => ({
        value: type,
        text: type
    }));

    return (
        <Dropdown
            selection
            options={options}
            {...props}
        />
    );
};