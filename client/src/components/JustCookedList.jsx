/*eslint-disable no-unused-vars*/
import React, { Component, Fragment } from 'react';
import OrderEntry from './OrderEntry.jsx';
import Pagination from './Pagination.jsx';
/*eslint-disable no-unused-vars*/

export default class CookingNowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCookedOrdersPageNumber: 1,
      currentPageCreatedOrders: [],
      currentPageCookedOrders: [],
      ordersPerPage: 10
    };
    this.showCurrentPageCookedOrders = this.showCurrentPageCookedOrders.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
  }
  showCurrentPageCookedOrders(e, number) {
    e.preventDefault();
    this.setState({ currentCookedOrdersPageNumber: number }, () => {
      const { currentCookedOrdersPageNumber, ordersPerPage } = this.state;
      const { cookedOrders } = this.props;
      const lastOrderIndex = currentCookedOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageCookedOrders = cookedOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageCookedOrders
      });
    });
  }

  handleChange(data) {
    this.props.handleChange(data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cookedOrders !== prevProps.cookedOrders) {
      // Show processed orders up to specified orders per page
      const { cookedOrders } = this.props;
      const { currentCookedOrdersPageNumber, ordersPerPage } = this.state;
      const lastOrderIndex = currentCookedOrdersPageNumber * ordersPerPage - 1;
      const firstOrderIndex = lastOrderIndex - ordersPerPage + 1;
      const currentPageCookedOrders = cookedOrders.slice(
        firstOrderIndex,
        lastOrderIndex
      );
      this.setState({
        currentPageCookedOrders
      });
    }
  }

  render() {
    const { currentPageCookedOrders, ordersPerPage } = this.state;
    const { cookedOrders } = this.props;
    return (
      <Fragment>
        {currentPageCookedOrders.map((cookedOrder, index) => (
          <OrderEntry
            key={index}
            order={cookedOrder}
            handleChange={this.handleChange}
          />
        ))}
        <Pagination
          itemsPerPage={ordersPerPage}
          totalItems={cookedOrders.length}
          paginate={this.showCurrentPageCookedOrders}
        />
      </Fragment>
    );
  }
}
