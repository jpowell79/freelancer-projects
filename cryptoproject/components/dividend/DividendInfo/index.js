import React, {Component} from 'react';

class DividendInfo extends Component {
    render(){
        return (
            <div>
                <p>There are 100000 TEST123 tokens in existence</p>
                <p>The current dividend stands at [value1] Ether</p>
                <p>Based on the number of TEST123 tokens you currently hold,
                    you will be entitled to a [value2]%  share of the dividend</p>
                <p>Based on your [value2]% share, you would be entitled to [value3] Eth</p>
                <p>The dividend smart contract address is: [value4]</p>
                <p>The dividend fund claim window is currently: [value5]</p>
                <p>The claim window will close in: [value6]</p>
            </div>
        );
    }
}

export default DividendInfo;