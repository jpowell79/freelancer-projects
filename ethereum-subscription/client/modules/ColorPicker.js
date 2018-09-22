import React, {Component, Fragment} from "react";
import {colors} from "../services/constants/css";
import objects from "../../services/datatypes/objects";
import {SketchPicker} from "react-color";
import PropTypes from "prop-types";

class ColorPicker extends Component {
    static propTypes = {
        defaultColor: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            showPicker: false,
            color: props.defaultColor
        };
    }

    render(){
        return (
            <Fragment>
                <div
                    style={{
                        width: "50px",
                        height: "25px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: this.state.color,
                        border: "1px solid #CFCFD0"
                    }}
                    onClick={() => {
                        this.setState((prevState) => ({
                            showPicker: !prevState.showPicker
                        }));
                    }}
                />
                {(this.state.showPicker) && (
                    <SketchPicker
                        color={this.state.color}
                        disableAlpha={true}
                        onChangeComplete={(color) => {
                            this.setState({color: color.hex});
                            this.props.onChange(color.hex);
                        }}
                        presetColors={objects.values(colors)}
                    />
                )}
                {(this.state.showPicker) && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                        onClick={() => {
                            this.setState({showPicker: false});
                        }}
                    />
                )}
            </Fragment>
        );
    }
}

export default ColorPicker;