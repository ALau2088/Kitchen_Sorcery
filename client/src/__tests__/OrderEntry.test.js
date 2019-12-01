import { shallow, mount } from 'enzyme';
import OrderEntry from '../components/OrderEntry.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

describe('OrderEntry', () => {
  const order1 = {
    destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
    event_name: 'CREATED',
    id: '4b76edbf',
    name: 'Cheese pizza',
    sent_at_second: 4
  };

  it('should render without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderEntry order={order1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render props', () => {
    const wrapper = mount(<OrderEntry order='1' />);
    console.log(wrapper.prop('order'));
    expect(wrapper.prop('order')).toEqual('1');
  });
});
