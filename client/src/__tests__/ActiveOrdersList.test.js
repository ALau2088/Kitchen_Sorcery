import { shallow, mount } from 'enzyme';
import ActiveOrdersList from '../components/ActiveOrdersList.jsx';
import React from 'react';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('ActiveOrdersList', () => {
  it('pass in activeOrders prop', () => {
    const activeOrders = [
      {
        destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
        event_name: 'CREATED',
        id: '4b76edbf',
        name: 'Cheese pizza',
        sent_at_second: 4
      },
      {
        destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
        event_name: 'COOKED',
        id: '4b76edbf',
        name: 'Cheese pizza',
        sent_at_second: 10
      }
    ];
    const wrapper = shallow(<ActiveOrdersList activeOrders={activeOrders} />);
    expect(wrapper.contains('activeOrders'));
  });
});
