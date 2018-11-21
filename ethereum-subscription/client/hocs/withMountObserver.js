import React, {Component} from "react";
import {getChildProps} from "../services/utils";

export default (PageComponent) => {
    return class MountObserver extends Component {
        static async getInitialProps (appContext){
            return await getChildProps(PageComponent, appContext);
        }

        isMounted = false;

        componentDidMount(){
            this.isMounted = true;
        }

        componentWillUnmount(){
            this.isMounted = false;
        }

        render() {
            return (
                <PageComponent
                    {...this.props}
                    isMounted={this.isMounted}
                />
            );
        }
    }
}