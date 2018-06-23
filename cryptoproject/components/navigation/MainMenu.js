import React, {Component} from 'react';
import Paths from '../utils/Paths';
import Link from 'next/link';
import {joinClassNames} from "../utils";
import {withRouter} from 'next/router';

class MainMenu extends Component {
    constructor(props){
        super(props);

        this.getActiveClass = this.getActiveClass.bind(this);
    }

    getActiveClass(page){
        return (this.props.router.route === page) ? " active" : "";
    }

    render(){
        let {className, ...props} = this.props;

        return (
            <nav {...props} className={joinClassNames("ui labeled stackable menu", className)}>
                <Link href="/"><a><img src={Paths.getImage('logo', 'small')}/></a></Link>
                <div className="right menu">
                    <a className="item">Trade</a>
                    <a className="item">How it Works</a>
                    <a className="item">The Team</a>
                    <Link href={Paths.getHistoricDataPage()}>
                        <a className={"item" + this.getActiveClass("/HistoricData")}>Historic Data</a>
                    </Link>
                    <a className="item">Contact</a>
                </div>
            </nav>
        );
    }
}

export default withRouter(MainMenu);