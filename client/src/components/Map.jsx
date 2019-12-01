/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiZHJld2wiLCJhIjoiY2szNDdlM3I2MTJqbjNuczV0aXpoYnQzOCJ9.IuLoFNG7730Xn2oMWSqyGw';

const StyledMapContainer = styled.div`
  display: static;
`;
/*eslint-disable no-unused-vars*/

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 0,
      zoom: 2,
      map: null
    };
  }
  componentDidMount() {
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    let container = this.mapContainer;
    mapboxClient.geocoding
      .forwardGeocode({
        query: '1800 Marine Street, Santa Monica, CA 90405',
        autocomplete: false,
        limit: 1
      })
      .send()
      .then(response => {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length
        ) {
          let feature = response.body.features[0];

          let popup = new mapboxgl.Popup({ offset: 25 }).setText(
            '1800 Marine Street, Santa Monica, CA 90405'
          );
          let map = new mapboxgl.Map({
            container: container,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: feature.center,
            zoom: 10
          });

          map.addControl(
            new MapboxDirections({
              accessToken: mapboxgl.accessToken
            }),
            'top-left'
          );

          this.setState(
            {
              map
            },
            () =>
              new mapboxgl.Marker()
                .setLngLat(feature.center)
                .setPopup(popup)
                .addTo(map)
          );
        }
      });
  }

  render() {
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    let container = this.mapContainer;
    let { orders } = this.props;
    for (let i = 0; i < orders.length; i++) {
      mapboxClient.geocoding
        .forwardGeocode({
          query: orders[i]['destination'],
          autocomplete: false,
          limit: 1
        })
        .send()
        .then(response => {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            let feature = response.body.features[0];
            let popup = new mapboxgl.Popup({ offset: 25 }).setText(
              orders[i]['destination']
            );
            new mapboxgl.Marker()
              .setLngLat(feature.center)
              .setPopup(popup)
              .addTo(this.state.map);
          }
        });
    }
    return (
      <StyledMapContainer>
        <div ref={el => (this.mapContainer = el)} className='mapContainer'>
          {/* <div className='sidebarStyle'>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
            {this.state.zoom}
          </div> */}
        </div>
      </StyledMapContainer>
    );
  }
}
