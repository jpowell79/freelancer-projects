import React, {Component} from "react";
import {joinClassNames} from "../../services/className";
import Link from "next/link";
import {withRouter} from "next/router";

class MainMenu extends Component {
    static defaultProps = {
        className: ""
    };

    getActiveClass = (page) => {
        return (this.props.router.route === page) ? "active" : "";
    };

    render(){
        const {
            className,
            router,
            ...props
        } = this.props;

        return (
            <nav className={joinClassNames("menu", className)} {...props}>
                <Link href="/">
                    <a className={this.getActiveClass("/")}>Play</a>
                </Link>
                <Link href="/Details">
                    <a className={this.getActiveClass("/Details")}>Details</a>
                </Link>
                <Link href="/PreviousGame">
                    <a className={this.getActiveClass("/PreviousGame")}>Previous game</a>
                </Link>
            </nav>
        );
    }
}

export default withRouter(MainMenu);
