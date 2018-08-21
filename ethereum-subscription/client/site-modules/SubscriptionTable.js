import React, {Component, Fragment} from 'react';
import SortableTable from "../modules/SortableTable";
import PropTypes from 'prop-types';
import strings from '../../services/strings';
import {classNames} from "../services/className";
import {Pagination} from 'semantic-ui-react';
import {paths} from '../../services/constants';
import Link from 'next/link';
import {ProviderRating} from "./ProviderRating";
import {hideOnMobile, hideOnTablet, showOnMobile} from "../services/css";

class SubscriptionTable extends Component {
    static defaultProps = {maxRows: -1, isLoading: false};
    static propTypes = {
        subscriptionContracts: PropTypes.array.isRequired,
        maxRows: PropTypes.number,
        buttonRenderer: PropTypes.func,
        isLoading: PropTypes.bool
    };
    state = {activePage: 1};

    static getDerivedStateFromProps(props, state){
        const totalPages = Math.ceil(props.subscriptionContracts.length/props.maxRows);

        if(state.activePage > totalPages && totalPages > 0){
            return {
                ...state,
                activePage: totalPages
            }
        }

        return state;
    }

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
                            <td className={hideOnTablet()}>{contract.reputation}</td>
                            <td className={hideOnTablet()}>{
                                strings.toDateString(new Date(contract.contractCreation))
                            }</td>
                            <td className={hideOnTablet()}>{contract.walletAge}</td>
                            <td>{contract.hasFreeTrials ? "Yes" : "No"}</td>
                            <td className={hideOnTablet()}>{contract.joiningFee} Eth</td>
                            <td className={hideOnTablet()}>{contract.exitFee} Eth</td>
                            <td className={hideOnTablet()}>{contract.subscriptionLengthInWeeks} Weeks</td>
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
                                            }}><a><span className={hideOnMobile()}>More </span>Info</a></Link>
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
                            <th>Subscription<span className={hideOnMobile()}> Type</span></th>
                            <th>Supplier</th>
                            <th className={hideOnTablet()}>Reputation</th>
                            <th className={hideOnTablet()}>Registration Age</th>
                            <th className={hideOnTablet()}>Wallet Age</th>
                            <th><span className={hideOnMobile()}>Free </span>Trial</th>
                            <th className={hideOnTablet()}>Join Fee</th>
                            <th className={hideOnTablet()}>Exit Fee</th>
                            <th className={hideOnTablet()}>Contract Length</th>
                            <th><span className={hideOnMobile()}>Monthly </span>Price</th>
                            <th className="no-sort"/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSubscriptionContracts()}
                    </tbody>
                </SortableTable>
                {(totalPages > 1) && (
                    <div className="text-center">
                        <div className={hideOnMobile()}>
                            <Pagination
                                activePage={this.state.activePage}
                                onPageChange={(e, {activePage}) => {
                                    this.setState({activePage});
                                }}
                                totalPages={totalPages}
                            />
                        </div>
                        <div className={showOnMobile()}>
                            <Pagination
                                activePage={this.state.activePage}
                                onPageChange={(e, {activePage}) => {
                                    this.setState({activePage});
                                }}
                                size="mini"
                                totalPages={totalPages}
                                siblingRange={0}
                                firstItem={null}
                                lastItem={null}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default SubscriptionTable;