/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  &:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  &:nth-of-type(odd) {
    background-color: #ffffff;
  }
`;

const StyledCell = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: left;
  flex-basis: 0;
`;
/*eslint-disable no-unused-vars*/

export default class OrderEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const socket = io();
    const { id } = this.props.order;
    const data = {
      id,
      event: e.target.value
    };
    socket.emit('change event status', data);
    socket.on('changed event status', data => {
      this.props.handleChange(data);
    });
  }

  render() {
    const { order } = this.props;
    return (
      <StyledRow>
        <StyledCell>{order.name}</StyledCell>

        <StyledCell style={{ textAlign: 'center' }}>
          <form>
            <select
              value={order.event_name}
              onChange={e => this.handleChange(e)}
            >
              <option value='CREATED'>CREATED</option>
              <option value='COOKED'>COOKED</option>
              <option value='CANCELLED'>CANCELLED</option>
              <option value='DRIVER_RECEIVED'>DRIVER RECEIVED</option>
              <option value='DELIVERED'>DELIVERED</option>
            </select>
          </form>
        </StyledCell>
        <StyledCell>{order.destination}</StyledCell>
      </StyledRow>
    );
  }
}
