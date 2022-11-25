import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'

import 'leaflet/dist/leaflet.css'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const Map = () => {
  const [map, setMap] = React.useState(null)

  return (
    <MapContainer
      zoomControl={false}
      whenCreated={setMap}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}
    >
      <ZoomControl position={'topright'} />
      <Tile />
    </MapContainer>
  )
}

export default Map
