import React, { Component } from "react"
import L from "leaflet"
import topoContors from "./static/topo-contours.json"
import { Slider } from "@material-ui/core"

export default class WaterWorld extends Component {
  constructor(props) {
    super(props)

    this.state = {
      waterLevel: 0
    }
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
  
    const fillColor = elevation < this.state.waterLevel ? "#aad3df" : "#060"
    //const fillColor = elevation !== 0 ? "#aad3df" : "#060"
    const fillOpacity = elevation < this.state.waterLevel ? 1 : 0.3
    //const fillOpacity = elevation === 0 ? 1 : 0
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
        <div id="map" style={{ height: "100vh", backgroundColor: "#aad3df" }} />
        <div
          style={{
            height: "calc(100vh - 32px)",
            width: "100px",
            backgroundColor: "#fff",
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 999,
          }}
        >
        <div style={{padding: "16px", height: "calc(100% - 32px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Slider
            orientation="vertical"
            defaultValue={0}
            aria-labelledby="vertical-slider"
            onChange={(_event, value) => {
              this.setState({waterLevel: value})
              //setRating(value)
            }}
            step={800}
            marks
            min={0}
            max={20000}
          />
        </div>
        </div>
      </div>
    )
  }
}
