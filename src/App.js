import React, { Component } from 'react'
import L from 'leaflet'
import topoContors from './topocontours.json'

function coolStyle(feature) {
  const elevation = feature.properties.elevation

  const fillColor = elevation < 800 ? "#aad3df" : "#060"
  const fillOpacity = elevation < 800 ? 1 : 0.3
  const weight = elevation === 0 ? 1 : 0
  return {
      fillColor,
      weight,
      opacity: 0.3,
      color: "#fff",
      fillOpacity
  }
}

export default class App extends Component {
  componentDidMount() {
    // create map
    let map = L.map('map', {
      center: [0, 0],
      zoom: 2
    });

    /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)*/

    L.geoJson(topoContors, {style: coolStyle}).addTo(map)
  }

  render() {
    return (
      <div id="map" style={{height: "100vh", backgroundColor: "#aad3df"}}></div>
    )
  }
}
