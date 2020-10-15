import React,{useState} from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

import './Maps.scss';

const accessToken = "pk.eyJ1Ijoic2hpdmFuc2gxMjM0IiwiYSI6ImNrZ2JhZmw0MjBibmEyeHFhYmk2NXNhMDAifQ._31D3XIt61x1VpyaOmXhWg";

const Maps= () => {
  const [viewport, setViewport] = useState({
    latitude: -1.9444,
    longitude: 30.0616,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="mapbox-react">
      <ReactMapGL
        {...viewport}
        width="1000px"
        height="500px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={accessToken}
      />
    </div>
  );
};

export default Maps;