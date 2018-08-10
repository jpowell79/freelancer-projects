import React, {Component, Fragment} from 'react';
import SortableTable from "../modules/SortableTable";
import PropTypes from 'prop-types';
import strings from '../../services/strings';
import {classNames} from "../services/className";
import {Pagination} from 'semantic-ui-react';
import {paths} from '../../services/constants';
import Link from 'next/link';
import {ProviderRating} from "./ProviderRating";

class SubscriptionTable extends Component {
    static defaultProps = {
        maxRows: -1
    };

    static propTypes = {
        subscriptionContracts: PropTypes.array.isRequired,
        maxRows: PropTypes.number,
        buttonRenderer: PropTypes.func,
    };

    state = {activePage: 1};

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
                    const buttonClass = classNames({
                        'ui button': true,
                        'primary': !contract.subscriptionActive,
                        'bg-color-uiRed color-white': contract.subscriptionActive
                    });

                    return (
                        <tr key={i}>
                            <td>{contract.type}</td>
                            <td>
                                <ProviderRating
                                    name={contract.supplierName}
                                    reputation={contract.reputation}
                                />
                            </td>
                            <td>{contract.reputation}</td>
                            <td>{strings.toDateString(new Date(contract.contractCreation))}</td>
                            <td>TBI</td>
                            <td>{contract.hasFreeTrials ? "Yes" : "No"}</td>
                            <td>{contract.joiningFee} Eth</td>
                            <td>{contract.exitFee} Eth</td>
                            <td>{contract.subscriptionLengthInWeeks} Weeks</td>
                            <td>{contract.subscriptionAmountToPay} Eth</td>
                            <td>
                                {(this.props.buttonRenderer)
                                    ? this.props.buttonRenderer({
                                        buttonClass,
                                        style: {whiteSpace: "nowrap"},
                                        contract
                                    })
                                    : (
                                        <button className={buttonClass} style={{
                                            whiteSpace: "nowrap"
                                        }}>
                                            <Link href={{
                                                pathname: paths.pages.subscriptionInfo,
                                                query: {address: contract.contractAddress}
                                            }}><a>More Info</a></Link>
                                        </button>
                                    )
                                }
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