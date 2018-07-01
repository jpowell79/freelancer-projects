import React, {Component} from 'react';

class DividendInfo extends Component {
    render(){
        return (
            <div className="ui very relaxed list text-center">
                <div className="item">
                    <p style={{fontSize: "1.3em"}}>There are <span className="bold">10,000,000</span> TEST123 tokens in existence</p>
                </div>
                <div className="item">
                    <p style={{fontSize: "1.3em"}}>The current dividend stands at <span className="bold">247.3</span> Eth</p>
                </div>
                <div className="item">
                    <p style={{fontSize: "1.3em"}}>You will be entitled to <span className="bold">0.1%</span> share of the dividend</p>
                </div>
                <div className="item">
                    <p style={{fontSize: "1.3em"}}>You would be entitled to claim <span className="bold">0.2473</span> Eth.</p>
                </div>
            </div>
        );
    }
}

export default DividendInfo;