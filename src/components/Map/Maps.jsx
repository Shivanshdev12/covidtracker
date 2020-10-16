import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr"; // React hook to fetch the data
import lookup from "country-code-lookup"; // npm module to get ISO Code for countries

import "./Maps.scss";

import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic2hpdmFuc2gxMjM0IiwiYSI6ImNrZ2JhZmw0MjBibmEyeHFhYmk2NXNhMDAifQ._31D3XIt61x1VpyaOmXhWg";

function Maps() {
  
  const mapboxElRef = useRef(null);
  const fetcher = url =>
    fetch(url)
      .then(r => r.json())
      .then(data =>
        data.map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude
            ]
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths
          }
        }))
      );

  // Fetching our data with swr package
  const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);

  useEffect(() => {
    if (data) {

      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/shivansh1234/ckgcrf4rc118v1amti1dgprnj",
        center: [16, 27], // initial geo location
        zoom: 2
      });
      map.addControl(new mapboxgl.NavigationControl());

      // Call this method when the map is loaded
      map.once("load", function () {
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data
          }
        });

        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points", // this should be the id of the source
          type: "circle",
          // paint properties
          paint: {
            "circle-opacity": 0.75,
            "circle-stroke-width": 1,
            "circle-radius": 4,
            "circle-color": "#FFEB3B"
          }
        });
      });

    }
  }, [data]);

  return (
    <div className="App">
      <div className="mapContainer">
        <div className="mapBox" ref={mapboxElRef} />
      </div>
    </div>
  );
}

export default Maps;