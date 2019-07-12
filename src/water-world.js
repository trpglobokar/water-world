import React, { Component } from "react"
import L from "leaflet"
import topoContors from "./static/topo-contours.json"
import { Slider } from "@material-ui/core"
import styled from "styled-components"


const MapContainer = styled.div`
  height: 100vh;
  background-color: #aad3df;
`
const MapControls = styled.div`
  height: calc(100vh - 32px);
  width: "100px";
  background-color: #fff;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  border-radius: 4px;
`

export default class WaterWorld extends Component {
  state = {
    waterLevel: 0
  }

  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [0, 0],
      zoom: 2,
    })

    /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)*/

    this.geoJson = L.geoJson(topoContors, { style: this.coolStyle }).addTo(this.map)
  }

  componentDidUpdate() {
    this.geoJson.eachLayer(layer => {
      const newStyle = this.coolStyle(layer.feature)
      layer.setStyle(newStyle)
    })
  }

  coolStyle = feature => {
    const elevation = feature.properties.elevation
    const isBelowWaterLevel = elevation < this.state.waterLevel
  
    const fillColor = isBelowWaterLevel ? "#aad3df" : "#060"
    const fillOpacity = isBelowWaterLevel ? 1 : 0.3
    const weight = elevation === 0 ? 1 : 0

    return {
      fillColor,
      weight,
      opacity: 0.3,
      color: "#fff",
      fillOpacity,
    }
  }


  render() {
    return (
      <div>
        <MapContainer id="map" />
        <MapControls>
        <div style={{padding: "16px", height: "calc(100% - 32px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Slider
            orientation="vertical"
            defaultValue={0}
            aria-labelledby="vertical-slider"
            onChange={(_event, value) => {
              this.setState({waterLevel: value})
            }}
            step={800}
            marks
            min={0}
            max={20000}
          />
        </div>
        </MapControls>
      </div>
    )
  }
}
