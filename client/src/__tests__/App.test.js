import { shallow, mount, render } from 'enzyme';
import App from '../components/App.jsx';
import React from 'react';
import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('Main App Component', () => {
  it('has orderEvents state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().orderEvents).toEqual([]);
  });

  xit('receives orderEvents on page load', () => {});

  xit('filters active orders', () => {});

  xit('filters processed orders', () => {});
});
