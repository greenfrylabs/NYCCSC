// var Acetate_terrain = L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/terrain/{z}/{x}/{y}.png', {
//   attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
//   subdomains: '0123',
//   minZoom: 2,
//   maxZoom: 18
// });

import React, { Component } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";

export default class MiniMap extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: ""
    };
  }

  updateSid() {
    const sid = this.props.sid;
    const isPoint = this.props.geomType === "stn";
    this.layer.setStyle(
      f =>
        isPoint
          ? {
              fillColor: f.id === sid ? "#E88D44" : "black",
              opacity: 0.0,
              fillOpacity: 0.5,
              color: "black"
            }
          : {
              fillColor: f.id === sid ? "#E88D44" : "lightgrey",
              weight: 1.5,
              opacity: 0.6,
              fillOpacity: 0.4,
              color: "black"
            }
    );
    this.layer.eachLayer(l => {
      if (l.feature.id === sid) {
        l.bringToFront();
      }
    });
  }

  updateLayer() {
    const sid = this.props.sid;
    if (this.layer && this.map.hasLayer(this.layer)) {
      this.map.removeLayer(this.layer);
    }
    this.center = this.props.center;
    this.geomType = this.props.geomType;
    const isPoint = this.geomType === "stn";
    const fl = (this.layer = L.geoJson(this.props.geoJSON, {
      pointToLayer: (geojson, latlng) =>
        new L.CircleMarker(latlng, {
          radius: 5,
          fillColor: "darkgrey",
          fillOpacity: 1.0,
          stroke: false,
          fill: true
        }),
      filter: f => true,
      style: f =>
        isPoint
          ? {
              fillColor: f.id === sid ? "#E88D44" : "black",
              opacity: 0.0,
              fillOpacity: 0.5,
              color: "black"
            }
          : {
              fillColor: f.id === sid ? "#E88D44" : "lightgrey",
              weight: 1.5,
              opacity: 0.6,
              fillOpacity: 0.4,
              color: "black"
            }
    }));

    fl.on("mouseover", e => {
      this.setState({ title: e.layer.feature.properties.name });
    });
    fl.on("mouseout", e => {
      this.setState({ title: "" });
    });
    fl.on("click", e => {
      this.props.update(e.layer.feature.id, "");
    });
    fl.addTo(this.map);
  }

  componentDidMount() {
    this.map = L.map(ReactDOM.findDOMNode(this.refs.map), {
      center: this.props.center,
      zoom: 5.6
    });

    //"boundingbox":["41.1863288879395","42.8867149353027","-73.5081481933594","-69.8615341186523"],"lat":"42.3788774","lon":"-72.032366"
    this.map = this.map.fitBounds([
      [41.1863288879395, -73.5081481933594],
      [42.8867149353027, -69.8615341186523]
    ]);

    L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
      { subdomains: "abcd", minZoom: 5, maxZoom: 10, opacity: 0.3 }
    ).addTo(this.map);
    if (this.props.geoJSON) {
      this.updateLayer();
      this.updateSid();
    }
  }

  componentWillUnmount() {
    this.map.removeEventListener();
    this.map = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geoJSON && this.geomType !== this.props.geomType) {
      this.updateLayer();
      this.updateSid();
    } else {
      if (prevProps.sid !== this.props.sid) this.updateSid();
    }
  }

  render() {
    const title = this.state.title;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h4>{title}</h4>
        </div>
        <div ref="map" style={{ width: "100%", height: "90%" }} />
      </div>
    );
  }
}
