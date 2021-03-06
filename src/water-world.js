import React, { Component } from "react"
import L from "leaflet"
import topoContors from "./static/topo-contours1.json"
import { Slider } from "@material-ui/core"
import styled from "styled-components"


const MapContainer = styled.div`
  height: 100vh;
  background-color: #aad3df;
`
const MapControls = styled.div`
  height: calc(100vh - 32px);
  max-height: 400px;
  width: 120px;
  background-color: #fff;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  border-radius: 4px;
`
const SliderLabel = styled.div`
  text-align: center;
  margin-bottom: 16px;
`
const MapControlsSpacer = styled.div`
  padding: 16px;
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .MuiSlider-valueLabel {
    top: -48px;
    left: calc(-50% + -12px);
    &>span {
      width: 48px;
      height: 48px;
    }
  }
`

export default class WaterWorld extends Component {
  constructor (props) {
    super(props)
    //const classes = useStyles()

    this.state = {
      waterLevel: 0
    }
  }

  componentDidMount() {
    let tempTransform = topoContors.features[0].geometry.coordinates

    // create map
    this.map = L.map("map", {
      center: [42, -90],
      zoom: 3,
      minZoom: 2,
      maxBounds: [
          [90, -290],
          [-66, 171]
      ]
    })

    this.map.createPane('labels')
    this.map.getPane('labels').style.zIndex = 650
    this.map.getPane('labels').style.pointerEvents = 'none'

    var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels'
    }).addTo(this.map)

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
          <MapControlsSpacer>
            <SliderLabel>
              Sea Level<br />
              {this.state.waterLevel} Feet
            </SliderLabel>
            <Slider
              orientation="vertical"
              defaultValue={0}
              valueLabelDisplay="auto"
              valueLabelFormat={x => `${x}ft`}
              aria-labelledby="vertical-slider"
              onChange={(_event, value) => {
                this.setState({waterLevel: value})
              }}
              step={800}
              marks
              min={0}
              max={20000}
            />
          </MapControlsSpacer>
        </MapControls>
      </div>
    )
  }
}
