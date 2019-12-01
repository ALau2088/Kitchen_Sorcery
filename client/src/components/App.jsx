/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import ActiveOrdersList from './ActiveOrdersList.jsx';
import ProcessedOrdersList from './ProcessedOrdersList.jsx';

const StyledButton = styled.button`
  background: white;
  font-size: 1.2em;
`;

const StyledNav = styled.nav`
  height: 50px;
  background-color: #f2f2f2;
  box-sizing: borderbox;
  padding: 0px;
  margin: 0px;
`;

const StyledSpan = styled.span`
  font-size: 1.5em;
`;
/*eslint-disable no-unused-vars*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderEvents: [],
      ordersToShow: 'activeOrders'
    };
    this.filterActiveOrders = this.filterActiveOrders.bind(this);
    this.filterProcessedOrders = this.filterProcessedOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const socket = io();
    socket.on('order data', data => {
      // if existing order update
      // else new order
      let existingOrderIndex;
      const existingOrder = this.state.orderEvents.filter((order, index) => {
        if (data.id === order.id) {
          existingOrderIndex = index;
          return order;
        }
      });
      if (existingOrder.length === 1) {
        const updatedOrders = this.state.orderEvents;
        updatedOrders[existingOrderIndex] = data;
        this.setState({ orderEvents: updatedOrders });
      } else {
        this.setState({
          orderEvents: [...this.state.orderEvents, data]
        });
      }
    });
  }

  filterActiveOrders() {
    this.setState({
      ordersToShow: 'activeOrders'
    });
  }
  filterProcessedOrders() {
    this.setState({
      ordersToShow: 'processedOrders'
    });
  }

  handleChange(data) {
    let orderIndex;
    const updatedOrderEvents = this.state.orderEvents;
    const updatedOrder = this.state.orderEvents.filter((order, index) => {
      if (order.id === data.id) {
        orderIndex = index;
        return order;
      }
    });
    updatedOrder[0]['event_name'] = data.event;
    updatedOrderEvents[orderIndex] = updatedOrder[0];
    this.setState({
      orderEvents: updatedOrderEvents
    });
  }

  render() {
    const { orderEvents } = this.state;
    const activeOrders = orderEvents.filter(order => {
      if (order.event_name !== 'CANCELLED' && order.event_name !== 'DELIVERED')
        return order;
    });
    const processedOrders = orderEvents.filter(order => {
      if (order.event_name === 'CANCELLED' || order.event_name === 'DELIVERED')
        return order;
    });
    const ordersList =
      this.state.ordersToShow === 'activeOrders' ? (
        <ActiveOrdersList
          activeOrders={activeOrders}
          handleChange={this.handleChange}
        />
      ) : (
        <ProcessedOrdersList
          processedOrders={processedOrders}
          handleChange={this.handleChange}
        />
      );
    return (
      <div style={{ padding: '0', margin: '0' }}>
        <div style={{ padding: '0', margin: '0' }}>
          <StyledNav>
            <StyledSpan>KITCHEN SORCERY{'  '}</StyledSpan>
            <StyledButton
              id='activeOrdersButton'
              onClick={this.filterActiveOrders}
            >
              Active Orders
            </StyledButton>
            <StyledButton
              id='processedOrdersButton'
              onClick={this.filterProcessedOrders}
            >
              Order History
            </StyledButton>
          </StyledNav>
        </div>
        {ordersList}
      </div>
    );
  }
}
