import React, {Component, Fragment} from 'react';
import SortableTable from "../modules/SortableTable";
import PropTypes from 'prop-types';
import strings from '../../services/strings';
import {Star} from "../modules/icons";
import {classNames} from "../services/className";
import {Pagination} from 'semantic-ui-react';

class SubscriptionTable extends Component {
    static defaultProps = {
        maxRows: -1
    };

    static propTypes = {
        subscriptionContracts: PropTypes.array.isRequired,
        maxRows: PropTypes.number
    };

    state = {activePage: 1};

    renderReputationStars = (name, reputation) => {
        if(reputation < 2){
            return <span>{name}</span>;
        } else if(reputation <= 10){
            return (
                <span style={{whiteSpace: "nowrap"}}>
                    <span style={{marginRight: "5px"}}>{name}</span>
                    <Star className="color-uiGreen"/>
                </span>
            );
        } else if(reputation <= 50){
            return (
                <span style={{whiteSpace: "nowrap"}}>
                    <span style={{marginRight: "5px"}}>{name}</span>
                    <Star className="color-uiBlue"/>
                </span>
            );
        } else if(reputation <= 100){
            return (
                <span style={{whiteSpace: "no-wrap"}}>
                    <span style={{marginRight: "5px"}}>{name}</span>
                    <Star className="color-uiPurple"/>
                </span>
            );
        } else if(reputation <= 250){
            return (
                <span style={{whiteSpace: "nowrap"}}>
                    <span style={{marginRight: "5px"}}>{name}</span>
                    <Star className="color-uiYellow"/>
                </span>
            );
        } else if(reputation <= 499){
            return (
                <span style={{whiteSpace: "nowrap"}}>
                    <span style={{marginRight: "5px"}}>{name}</span>
                    <Star className="color-uiYellow"/>
                    <Star className="color-uiYellow"/>
                </span>

            );
        } else {
            return (
                <span style={{whiteSpace: "nowrap"}}>
                    <strong style={{marginRight: "5px"}}>{name}</strong>
                    <Star className="color-uiYellow"/>
                    <Star className="color-uiYellow"/>
                </span>
            );
        }

    };

    renderSubscriptionContracts = () => {
        const {activePage} = this.state;
        const {maxRows} = this.props;

        return (
            this.props.subscriptionContracts
                .filter((contract, i) => {
                    if(maxRows < 0) return true;

                    return (i >= (maxRows*(activePage-1))) && (i < (maxRows*activePage));
                })
                .map((contract, i) => {
                    //TODO: Add more info link

                    const buttonClass = classNames({
                        'ui button': true,
                        'primary': !contract.subscriptionActive,
                        'bg-color-uiRed color-white': contract.subscriptionActive
                    });

                    return (
                        <tr key={i}>
                            <td>{contract.type}</td>
                            <td>{this.renderReputationStars(
                                contract.supplierName,
                                contract.reputation
                            )}</td>
                            <td>{contract.reputation}</td>
                            <td>{strings.toDateString(new Date(contract.contractCreation))}</td>
                            <td>TBI</td>
                            <td>{contract.hasFreeTrials ? "Yes" : "No"}</td>
                            <td>{contract.joiningFee} Eth</td>
                            <td>{contract.exitFee} Eth</td>
                            <td>{contract.subscriptionLengthInWeeks} Weeks</td>
                            <td>{contract.subscriptionAmountToPay} Eth</td>
                            <td>
                                <button className={buttonClass}>
                                    More Info
                                </button>
                            </td>
                        </tr>
                    );
            })
        );
    };

    render(){
        const {
            subscriptionContracts,
            maxRows
        } = this.props;

        const totalPages = Math.ceil(subscriptionContracts.length/maxRows);

        return (
            <Fragment>
                <SortableTable>
                    <thead>
                        <tr>
                            <th>Subscription Type</th>
                            <th>Supplier</th>
                            <th>Reputation</th>
                            <th>Registration Age</th>
                            <th>Wallet Age</th>
                            <th>Free Trial</th>
                            <th>Join Fee</th>
                            <th>Exit Fee</th>
                            <th>Contract Length</th>
                            <th>Monthly Price</th>
                            <th className="no-sort"/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSubscriptionContracts()}
                    </tbody>
                </SortableTable>
                {(totalPages > 1) && (
                    <div className="text-center">
                        <Pagination
                            activePage={this.state.activePage}
                            onPageChange={(e, {activePage}) => {
                                this.setState({activePage});
                            }}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </Fragment>
        );
    }
}

export default SubscriptionTable;