import { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, L, GeoJSON } from 'react-leaflet'
import countries from "../data/countries.json"
import "./mapStyles.css"

const mapboxLink = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9uaWhhbG1ldG9qYSIsImEiOiJjbDBzN2NqYWQwMXNxM2JtaDZ3OGthYWQ1In0.ALPmMcLVezZiSLWzY3sdFA';
const attribution = `
Map data & copy
<a href='https://www.openstreetmap.org/'>
  OpenStreetMap
  </a>
contributors,
  <a href='https://creativecommons.org/licenses/by-sa/2.0/'>
    CC-BY-SA
  </a>
  , Imagery ©
<a href='https://www.mapbox.com/'>
  Mapbox
  </a>`

const center = [45, -0]
const zoom = 2.4

export function DisplayPosition({ map, bounds }) {

  const [position, setPosition] = useState(map.getCenter())

  useEffect(() => {
    if(bounds) map.fitBounds(bounds);
  }, [bounds])


  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <></>
  )
}

export function DisplayMap({setSingleCountry}) {

  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)


  const countryStyle = {
    weight:1,
    fillColor: "#263750"
  };

  const onEachCountry = (country, layer, map) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName)
    layer.on('mouseover', function () {
      this.setStyle({
        'fillColor': '#ffffff'
      });
    });
    layer.on('mouseout', function (e) {
      resetColor(e);
    });
    layer.on('click', function (e) {
      var bounds = [e.target.getBounds()];
      setBounds(bounds)
      setSingleCountry(e.target.feature);
    });
  }

  function highlightFeature(e) {
    this.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
    });
   }

   function resetColor(e) {
    let layer = e.target;
    layer.setStyle(countryStyle);
   }


      function countryColor(d) {
        return d > 1000000 ? '#016c59' :
            d > 100000 ? '#1c9099' :
            d > 10000 ? '#67a9cf' :
            d > 1000 ? '#bdc9e1' :
            d > 100 ? '#f6eff7' :
            'white';
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5,
            fillColor: countryColor(feature.properties.wineConsumption)
        };
    }

  const displayMap = useMemo(
    () => (
      <MapContainer style={{ height: "95vh", width: "70vw"}} center={center} zoom={zoom} whenCreated={setMap} zoomSnap="0.2" minZoom="2.4" maxZoom="6">
        {/* <TileLayer
            attribution = {attribution}
            maxZoom="18"
            id="mapbox.light"
            url={mapboxLink}
        /> */}
        {map ? <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry} map={map}/> : <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry}/>}
      </MapContainer>
    ),
    [map],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} bounds={bounds} /> : null}
      {displayMap}
    </div>
  )
}