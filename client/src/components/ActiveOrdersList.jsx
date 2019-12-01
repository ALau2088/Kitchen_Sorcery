/*eslint-disable no-unused-vars*/
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Map from './Map.jsx';
import OrderEntry from './OrderEntry.jsx';
import Pagination from './Pagination.jsx';
import CookingNowList from './CookingNowList.jsx';
import JustCookedList from './JustCookedList.jsx';

const StyledRow = styled.div`
  width: 100%;
  display: flex;
`;

const StyledCell = styled.div`
  flex-grow: 1;
`;

const StyledButton = styled.button`
  background: white;
  font-size: 1.2em;
`;

const StyledSpan = styled.span`
  font-size: 1.2em;
`;
/*eslint-disable no-unused-vars*/

export default class ActiveOrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdOrders: [],
      cookedOrders: [],
      currentActiveOrdersPageNumber: 1,
      currentPageActiveOrders: [],
      ordersPerPage: 10,
      ordersToShow: 'AllOrders'
    };
    this.showAllOrders = this.showAllOrders.bind(this);
    this.filterCreatedOrders = this.filterCreatedOrders.bind(this);
    this.filterCookedOrders = this.filterCookedOrders.bind(this);
    this.showCurrentPageActiveOrders = this.showCurrentPageActiveOrders.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
  }

  showAllOrders() {
    this.setState({
      ordersToShow: 'AllOrders'
    });
  }

  filterCreatedOrders() {
    const createdOrders = this.props.activeOrders.filter(order => {
      if (order.event_name === 'CREATED') return order;
    });
    this.setState({
      createdOrders,
      ordersToShow: 'CreatedOrders'
    });
  }

  filterCookedOrders() {
    const cookedOrders = this.props.activeOrders.filter(order => {
      if (order.event_name === 'COOKED') return order;
    });
    this.setState({
      cookedOrders,
      ordersToShow: 'CookedOrders'
    });
  }

  showCurrentPageActiveOrders(e, number) {
    e.preventDefault();
    this.setState({ currentActiveOrdersPageNumber: number }, () => {
      const { currentActiveOrdersPageNumber, ordersPerPage } = this.state;
      const { activeOrders } = this.props;
      const lastOrderIndex = currentActiveOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageActiveOrders = activeOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageActiveOrders
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeOrders !== prevProps.activeOrders) {
      // Show processed orders up to specified orders per page
      const { activeOrders } = this.props;
      const { currentActiveOrdersPageNumber, ordersPerPage } = this.state;
      const lastOrderIndex = currentActiveOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageActiveOrders = activeOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageActiveOrders
      });
    }
  }

  handleChange(data) {
    this.props.handleChange(data);
  }

  render() {
    const {
      createdOrders,
      cookedOrders,
      currentPageActiveOrders,
      ordersPerPage
    } = this.state;
    let orderList;
    const { activeOrders } = this.props;
    if (this.state.ordersToShow === 'AllOrders') {
      orderList = (
        <Fragment>
          {currentPageActiveOrders.map((activeOrder, index) => (
            <OrderEntry
              data-test='activeOrder'
              key={index}
              order={activeOrder}
              handleChange={this.handleChange}
            />
          ))}
          <Pagination
            itemsPerPage={ordersPerPage}
            totalItems={activeOrders.length}
            paginate={this.showCurrentPageActiveOrders}
          />
        </Fragment>
      );
    } else if (this.state.ordersToShow === 'CreatedOrders') {
      orderList = (
        <CookingNowList
          createdOrders={createdOrders}
          handleChange={this.handleChange}
        />
      );
    } else {
      orderList = (
        <JustCookedList
          cookedOrders={cookedOrders}
          handleChange={this.handleChange}
        />
      );
    }
    return (
      <div>
        <div>
          <StyledSpan>Active Orders{'  '}</StyledSpan>
          <StyledButton onClick={this.showAllOrders}>All</StyledButton>
          <StyledButton onClick={this.filterCreatedOrders}>
            Cooking Now
          </StyledButton>
          <StyledButton onClick={this.filterCookedOrders}>
            Just Cooked
          </StyledButton>
        </div>
        <Map orders={activeOrders} />
        <StyledRow>
          <StyledCell>ORDER</StyledCell>
          <StyledCell>STATUS</StyledCell>
          <StyledCell>DESTINATION</StyledCell>
        </StyledRow>
        {orderList}
      </div>
    );
  }
}
