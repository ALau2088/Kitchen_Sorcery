import { shallow } from 'enzyme';
import Map from '../components/Map.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('Map', () => {
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
  it('should render without errors', () => {});
});
