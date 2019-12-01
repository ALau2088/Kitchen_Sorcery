import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import OrderEntry from './OrderEntry.jsx';
import Pagination from './Pagination.jsx';

export default class CookingNowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdOrders: [],
      currentCreatedOrdersPageNumber: 1,
      currentPageCreatedOrders: [],
      ordersPerPage: 10
    };
    this.showCurrentPageCreatedOrders = this.showCurrentPageCreatedOrders.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
  }
  showCurrentPageCreatedOrders(e, number) {
    e.preventDefault();
    this.setState({ currentCreatedOrdersPageNumber: number }, () => {
      const { currentCreatedOrdersPageNumber, ordersPerPage } = this.state;
      const { createdOrders } = this.props;
      const lastOrderIndex = currentCreatedOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageCreatedOrders = createdOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageCreatedOrders
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.createdOrders !== prevProps.createdOrders) {
      // Show processed orders up to specified orders per page
      const { createdOrders } = this.props;
      const { currentCreatedOrdersPageNumber, ordersPerPage } = this.state;
      const lastOrderIndex = currentCreatedOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageCreatedOrders = createdOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageCreatedOrders
      });
    }
  }

  handleChange(data) {
    this.props.handleChange(data);
  }

  render() {
    const { currentPageCreatedOrders, ordersPerPage } = this.state;
    const { createdOrders } = this.props;
    return (
      <Fragment>
        {currentPageCreatedOrders.map((createdOrder, index) => (
          <OrderEntry
            key={index}
            order={createdOrder}
            handleChange={this.handleChange}
          />
        ))}
        <Pagination
          itemsPerPage={ordersPerPage}
          totalItems={createdOrders.length}
          paginate={this.showCurrentPageCreatedOrders}
        />
      </Fragment>
    );
  }
}
