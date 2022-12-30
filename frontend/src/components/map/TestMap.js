import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const TesMap = (props) => {
  const [map, setMap] = React.useState(null)

  return (
    <MapContainer
      whenCreated={setMap}
      zoomControl={false}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{
        height: '100vh',
        zIndex: '1',
      }}
    >
      <ZoomControl position={'bottomright'} />
      <Tile />
    </MapContainer>
  )
}

export default TesMap
