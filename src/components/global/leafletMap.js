import { useEffect, useMemo, useState} from 'react'
import { MapContainer, GeoJSON, TileLayer, ZoomControl } from 'react-leaflet'
import { useStableCallback } from '../functions/useStableCalllback'
import { ResetButton } from './mapStyles.js'

import axios from "axios"

let countries2 = require("../data/countries2.json")

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

  map.setMaxBounds([[-90,-180], [90,180]]);
  
  useEffect(() => {
    if(bounds) map.fitBounds(bounds);
  }, [bounds, map])

  return (
    <></>
  )
}

export function DisplayMap({setSingleCountry, isBigScreen, setAllExperiences, setSelectedExperiences, allExperiences, success}) {

  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [selected, setSelected] = useState(null)
  const keyMap = useState(Math.random())

  const stableReset = useStableCallback(resetColor)

  function countryStyle(countryName) {
    if(allExperiences){

    let calculatedColor = [0,0,0];
    let keys = Object.keys(allExperiences);
    let found = false;

    /*Below, the chosen color is calculated. If the number exceeds max (255) it's simply set to 255 to prevent errors*/

    for(let i=0;i<keys.length;i++){
      if(keys[i] === countryName.properties.name){

          if(allExperiences[keys[i]].persons){
            calculatedColor[0] += allExperiences[keys[i]].persons.length * 75;
            if(calculatedColor[0] > 255) calculatedColor[0] = 255;
            found = true;
          }
          if(allExperiences[keys[i]].visits){
            calculatedColor[1] += allExperiences[keys[i]].visits.length * 75;
            if(calculatedColor[1] > 255) calculatedColor[1] = 255;
            found = true;
          }
          if(allExperiences[keys[i]].books){
            calculatedColor[2] += allExperiences[keys[i]].books.length * 75;
            if(calculatedColor[2] > 255) calculatedColor[2] = 255;
            found = true;
          }
          if(allExperiences[keys[i]].dishes){
            calculatedColor[0] += allExperiences[keys[i]].dishes.length * 25;
            calculatedColor[1] += allExperiences[keys[i]].dishes.length * 25;
            calculatedColor[2] += allExperiences[keys[i]].dishes.length * 25;
            if(calculatedColor[0] > 255) calculatedColor[0] = 255;
            if(calculatedColor[1] > 255) calculatedColor[1] = 255;
            if(calculatedColor[2] > 255) calculatedColor[2] = 255;
            found = true;
          }

          /*Gold for max everything*/

          if(calculatedColor[0] > 200 && calculatedColor[1] > 200 && calculatedColor[2] > 200){
            return {
              fillColor: `#d4af37`,
              color: `#d4af37`,
              weight: 2
            }
          }

          calculatedColor[0] = calculatedColor[0].toString(16)
          if (calculatedColor[0].length < 2) {
            calculatedColor[0] = "0" + calculatedColor[0];
          }
          calculatedColor[1] = calculatedColor[1].toString(16)
          if (calculatedColor[1].length < 2) {
            calculatedColor[1] = "0" + calculatedColor[1];
          }
          calculatedColor[2] = calculatedColor[2].toString(16)
          if (calculatedColor[2].length < 2) {
            calculatedColor[2] = "0" + calculatedColor[2];
          }         
      }
    }

    if(found === true){
      return {
        weight: 1,
        fillColor: `#${calculatedColor[0]}${calculatedColor[1]}${calculatedColor[2]}`,
        color: `#000`,
      }
    }

    else {
      return {
        weight: 1,
        fillColor: "#263750",
        color: "#000"
      }
    }
  }

  else{
    return {
        weight: 1,
        fillColor: "#263750",
        color: "#000"
      }
    }
  }

  useEffect(() => {
    
    if(selected && selected.target){ 
      let payload = {
        "user":localStorage.getItem("usertoken"),
        "country":selected.target.feature.properties.name
      }
      axios.post(`https://globalizrbackend.herokuapp.com/getone`, payload)
              .then((res) => {
                  if(res.data[0]){
                      setSelectedExperiences(res.data[0].experiences[selected.target.feature.properties.name])
                  }
              })
            }
  }, [selected, success, setSelectedExperiences])

  useEffect(() => {
    let payload = {
      "user":localStorage.getItem("usertoken"),
    }
    axios.post(`https://globalizrbackend.herokuapp.com/getall`, payload)
            .then((res) => {
                if(res.data[0]){
                    setAllExperiences(res.data[0].experiences)
                }
            })
  }, [success, setAllExperiences])

  function onEachCountry (country, layer) {
    layer.setStyle(countryStyle(country))
    layer.on('mouseover', function () {
      this.setStyle({
        'weight' : 2,
        'color' : "#bbbbbb",
      });
    });
    layer.on('mouseout', function (e) {
      stableReset(e, e.target.feature)
    });
    layer.on('click', function (e) {
      var bounds = [e.target.getBounds()];
      setBounds(bounds)
      setSelected(e);
      setSingleCountry(e.target.feature);
    });
  }

   function resetColor(e, target) {
      e.target.setStyle(countryStyle(target));
   }

  const displayMap = useMemo(
    () => (
      <MapContainer aria-label="World map" tabindex={0} key={keyMap} center={center} zoom={zoom} whenCreated={setMap} zoomSnap="0.2" minZoom="2.4" maxZoom="6" maxBoundsViscosity="1.0" zoomControl={false}>
        <TileLayer
            aria-label="Map tiles"
            attribution = {attribution}
            maxZoom="18"
            id="mapbox.light"
            url={mapboxLink}
        />
        {map ? <GeoJSON key={keyMap} style={countryStyle} data={countries2.features} onEachFeature={onEachCountry} map={map} tabindex={0}/> : <GeoJSON style={countryStyle} data={countries2.features} onEachFeature={onEachCountry} tabindex={0}/>}
        <ZoomControl aria-label="Zoom controls" tabindex={0} position='topleft' />

      </MapContainer>
    ), // eslint-disable-next-line
    [map, success, countryStyle, keyMap, onEachCountry], // "success" is what forces the component to rerender when new data has been added, linter is wrong.
  )

  return (
    <div className="map-container">
      <ResetButton aria-label="Reset zoom" tabIndex={0} className="reset-button" onClick={() => map.setView(center, zoom)}>Reset map view</ResetButton>
      {map ? <DisplayPosition map={map} bounds={bounds} /> : null}
      {displayMap}
    </div>
  )
}