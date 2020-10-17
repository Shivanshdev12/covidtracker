import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr"; // React hook to fetch the data
import lookup from "country-code-lookup"; // npm module to get ISO Code for countries

import './Maps.scss';
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic2hpdmFuc2gxMjM0IiwiYSI6ImNrZ2JhZmw0MjBibmEyeHFhYmk2NXNhMDAifQ._31D3XIt61x1VpyaOmXhWg";

const Maps=()=>{
  
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
        zoom:1
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
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get","cases"],
              1,4,
              1000,8,
              4000,10,
              8000,14,
              12000,18,
              100000,40
            ],
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get","cases"],
              1,"#e5f5f9",
              1000,"#ece2f0",
              4000,"#99d8c9",
              8000,"#a6bddb",
              12000,"#2b8cbe",
              100000,"#b10026"
            ]
          }
        });
        const popup = new mapboxgl.Popup({
          closeButton:false,
          closeOnClick:true
        });
        let lastId;
        map.on('mousemove',"circles",event=>{
          const id = event.features[0].properties.id;
          if(id!==lastId)
          {
            lastId = id;
            map.getCanvas().style.cursor = "pointer";
            const {cases,deaths,country,province} = event.features[0].properties;
            const coordinates = event.features[0].geometry.coordinates.slice();

            const countryISO =  lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;
            const provinceHTML = province !== "null" ? `<p><b>${province}</b></p>` : `${country}`;
            const mortalityRate = ((deaths/cases)*100).toFixed(2);

            const countryFlagHTML = Boolean(countryISO) ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`: "";
            const HTML = 
            `<p>Country: <b>${country}</b></p>
              <p>Area: <b>${provinceHTML}</b></p>
              <p>Cases: <b>${cases}</b></p>
              <p>Deaths: <b>${deaths}</b></p>
              <p>Mortality Rate: <b>${mortalityRate}%</b></p>
              ${countryFlagHTML}`;
              
              while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              popup
              .setLngLat(coordinates)
              .setHTML(HTML)
              .addTo(map);
            }
        });
        ///
        map.on("mouseleave","circles",function(){
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        })
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