import React, {Component, Fragment} from "react";
import SortableTable from "../../../containers/SortableTable/index";
import PropTypes from "prop-types";
import {Pagination} from "semantic-ui-react";
import {hideOnMobile, showOnMobile} from "../../../services/constants/css";
import {SubscriptionTableHead} from "./SubsriptionTableHead";
import {SubscriptionTableBody} from "./SubscriptionTableBody";
import {getChildrenArray} from "../../../services/utils";

class SubscriptionTable extends Component {
    static defaultProps = {
        maxRows: -1
    };

    static propTypes = {
        subscriptionContracts: PropTypes.array.isRequired,
        maxRows: PropTypes.number,
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

    render(){
        const {activePage} = this.state;

        const {
            subscriptionContracts,
            maxRows
        } = this.props;

        const totalPages = Math.ceil(subscriptionContracts.length/maxRows);
        const contracts = this.props.subscriptionContracts.filter((contract, i) => {
            if(maxRows < 0) return true;
            return (i >= (maxRows*(activePage-1))) && (i < (maxRows*activePage));
        });

        const children = getChildrenArray(this.props.children);
        const Head = (children.length > 0) ? children[0] : <SubscriptionTableHead/>;
        const Body = (children.length > 1) ? children[1] : <SubscriptionTableBody/>;

        return (
            <Fragment>
                <SortableTable>
                    <thead>
                        {Head}
                    </thead>
                    <tbody>
                        {React.cloneElement(Body, {contracts})}
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