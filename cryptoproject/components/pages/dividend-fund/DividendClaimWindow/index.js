import React, {Component} from 'react';
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";
import Countdown from 'react-countdown-now';

class DividendClaimWindow extends Component {
    render(){
        return (
            <div id="dividend-claim-window">
                <h2 className="no-margin-bottom">The dividend fund claim window is currently</h2>
                <h3 className="capitalized">OPEN</h3>
                <h2>The claim window will close in</h2>
                <Countdown
                    date={0}
                    onComplete={() => {}}
                    renderer={CryptoCountdown.countdownRenderer}
                />
                <h2>Click the claim button to claim your dividend</h2>
                <button className="ui huge primary button">Claim</button>
            </div>
        );
    }
}

export default DividendClaimWindow;