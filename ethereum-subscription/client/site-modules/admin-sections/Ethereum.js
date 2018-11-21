import React, {Component, Fragment} from "react";
import withSettingsEditor from "../../hocs/withSettingsEditor";
import {Form} from "semantic-ui-react";

class Ethereum extends Component {
    state = {
        httpProvider: null,
        etherScanUrl: null
    };

    render(){
        const {
            httpProvider,
            etherScanUrl
        } = this.props.getDefaultsOrState(this.state);

        return (
            <Fragment>
                <Form>
                    <Form.Field>
                        <label>Provider</label>
                        <input
                            type="text"
                            value={httpProvider.value}
                            onChange={(event) => {
                                this.setState({
                                    httpProvider: {value: event.target.value}
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Etherscan URL</label>
                        <input
                            type="text"
                            value={etherScanUrl.value}
                            onChange={(event) => {
                                this.setState({
                                    etherScanUrl: {value: event.target.value}
                                });
                            }}
                        />
                    </Form.Field>
                </Form>
            </Fragment>
        );
    }
}

export default withSettingsEditor(Ethereum, "Ethereum");