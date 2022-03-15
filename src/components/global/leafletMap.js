import { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
const mapboxLink = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9uaWhhbG1ldG9qYSIsImEiOiJjbDBzN2NqYWQwMXNxM2JtaDZ3OGthYWQ1In0.ALPmMcLVezZiSLWzY3sdFA';

const center = [30, -0]
const zoom = 2.4

export function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())

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
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

export function DisplayMap() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer style={{ height: "85vh", width: "70vw"}} center={center} zoom={zoom} whenCreated={setMap} zoomSnap="0.2">
        <TileLayer
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom="18"
            id="mapbox.light"
            url={mapboxLink}
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}