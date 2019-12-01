/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import styled from 'styled-components';
import OrderEntry from './OrderEntry.jsx';
import Pagination from './Pagination.jsx';

const StyledRow = styled.div`
  width: 100%;
  display: flex;
`;

const StyledCell = styled.div`
  flex-grow: 1;
`;
/*eslint-disable no-unused-vars*/

export default class ProcessedOrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      currentPageProcessedOrders: [],
      ordersPerPage: 10
    };
    this.showCurrentPageOrders = this.showCurrentPageOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showCurrentPageOrders(e, number) {
    e.preventDefault();
    this.setState({ currentPageNumber: number }, () => {
      const { currentPageNumber, ordersPerPage } = this.state;
      const { processedOrders } = this.props;
      const lastOrderIndex = currentPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageProcessedOrders = processedOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageProcessedOrders
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.processedOrders !== prevProps.processedOrders) {
      // Show processed orders up to specified orders per page
      const { processedOrders } = this.props;
      const { currentPageNumber, ordersPerPage } = this.state;
      const lastOrderIndex = currentPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageProcessedOrders = processedOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageProcessedOrders
      });
    }
  }

  handleChange(data) {
    this.props.handleChange(data);
  }

  render() {
    const { currentPageProcessedOrders, ordersPerPage } = this.state;
    const { processedOrders } = this.props;
    return (
      <div>
        <h1>Order History</h1>
        <StyledRow>
          <StyledCell>ORDER</StyledCell>
          <StyledCell>STATUS</StyledCell>
          <StyledCell>DESTINATION</StyledCell>
        </StyledRow>
        {currentPageProcessedOrders.map((processedOrder, index) => (
          <OrderEntry
            key={index}
            order={processedOrder}
            handleChange={this.handleChange}
          />
        ))}
        <Pagination
          itemsPerPage={ordersPerPage}
          totalItems={processedOrders.length}
          paginate={this.showCurrentPageOrders}
        />
      </div>
    );
  }
}
