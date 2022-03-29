import { useCallback, useEffect, useMemo, useState} from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'

import { usePrevious } from "../functions/usePrevious"
import { useStableCallback } from '../functions/useStableCalllback'
import { ResetButton } from './mapStyles.js'

import axios from "axios"

import countries from "../data/countries.json"
import "./mapStyles.js"

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

export function DisplayMap({setSingleCountry, isBigScreen, token, setAllExperiences, setSelectedExperiences, allExperiences}) {

  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [selected, setSelected] = useState(null)
  const [previous, setPrevious] = useState(null)

  const prevSelected = usePrevious(selected)

  const stableReset = useStableCallback(resetColor)

  function countryStyle(countryName) {
    if(allExperiences){

    let calculatedColor = [0,0,0];
    let keys = Object.keys(allExperiences);
    let found = false;

    for(let i=0;i<keys.length;i++){
      if(keys[i] === countryName.properties.ADMIN){
        found = true;
          if(allExperiences[keys[i]].persons){
            calculatedColor[0] =+ allExperiences[keys[i]].persons.length * 10;
          }
          if(allExperiences[keys[i]].visits){
            calculatedColor[1] =+ allExperiences[keys[i]].visits.length * 10;
          }
          if(allExperiences[keys[i]].books){
            calculatedColor[2] =+ allExperiences[keys[i]].books.length * 10;
          }
          if(allExperiences[keys[i]].dishes){
            calculatedColor[0] =+ allExperiences[keys[i]].dishes.length * 5;
            calculatedColor[1] =+ allExperiences[keys[i]].dishes.length * 5;
            calculatedColor[2] =+ allExperiences[keys[i]].dishes.length * 5;
          }
          calculatedColor[0] = calculatedColor[0].toString(16)
          calculatedColor[1] = calculatedColor[1].toString(16)
          calculatedColor[2] = calculatedColor[2].toString(16)


          
      }
      
    }

    if(found = true){
      return {
        weight:1,
        fillColor: `#${calculatedColor[0]}${calculatedColor[1]}${calculatedColor[2]}`,
        color: `#000`
      }
    }
    else {
      return {
        weight:1,
        fillColor: "#263750",
        color: "#3284f8"
      }
    }
  
  }

  else{
    return {
      weight:1,
      fillColor: "#263750",
      color: "#3284f8"
    }
  }


  }

  useEffect(() => {
    // if(prevSelected && selected !== prevSelected){
    //   stableReset(prevSelected)
    // }
    if(selected){ 
      let payload = {
        "user":localStorage.getItem("usertoken"),
        "country":selected.feature.properties.ADMIN
      }
      axios.post(`http://localhost:3000/getone`, payload)
              .then((res) => {
                  if(res.data){
                      setSelectedExperiences(res.data[0].experiences[selected.feature.properties.ADMIN])
                  }
              })
            }
  }, [selected])

  useEffect(() => {
    let payload = {
      "user":localStorage.getItem("usertoken"),
    }
    axios.post(`http://localhost:3000/getall`, payload)
            .then((res) => {
                if(res.data){
                    setAllExperiences(res.data[0].experiences)
                }
            })
  }, [])

  function onEachCountry (country, layer, map) {
    
    const countryName = country.properties.ADMIN;

    layer.setStyle(countryStyle(country))
    layer.on('mouseover', function () {
      this.setStyle({
        'weight' : 2,
        'color' : "#ffffff",
        'fillColor': '#ffffff'
      });
    });
    layer.on('mouseout', function (e) {
      stableReset(e, e.target.feature)
    });
    layer.on('click', function (e) {
      this.setStyle({
        'fillColor': '#ffffff'
      });
      var bounds = [e.target.getBounds()];
      setBounds(bounds)
      if(selected) setPrevious(selected)
      setSelected(e.target);
      setSingleCountry(e.target.feature);
    });
  }

  function test(prop) {
    // console.log(prop)
   }

   useEffect(() => {
  }, [previous])

   function resetColor(e, target) {

      
    if(selected){
      if(selected.feature.properties.ADMIN !== e.target.feature.properties.ADMIN){
          e.target.setStyle(countryStyle(target));
        }
    }
    else{
      e.target.setStyle(countryStyle(target));
    }
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
      <MapContainer center={center} zoom={zoom} whenCreated={setMap} zoomSnap="0.2" minZoom="2.4" maxZoom="6">
        {/* <TileLayer
            attribution = {attribution}
            maxZoom="18"
            id="mapbox.light"
            url={mapboxLink}
        /> */}
        {map ? <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry} map={map}/> : <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry}/>}
      </MapContainer>
    ),
    [map, isBigScreen],
  )

  return (
    <div className="map-container">
      <ResetButton className="reset-button" onClick={() => map.setView(center, zoom)}>Reset map view</ResetButton>
      {map ? <DisplayPosition map={map} bounds={bounds} /> : null}
      {displayMap}
    </div>
  )
}