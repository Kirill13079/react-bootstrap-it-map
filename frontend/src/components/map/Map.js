import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'
import Markers from './Markers'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import 'react-leaflet-markercluster/dist/styles.min.css'

import 'leaflet/dist/leaflet.css'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const Map = (props) => {
  return (
    <MapContainer
      zoomControl={false}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}
    >
      <ZoomControl position={'bottomright'} />
      <Tile />
      <MarkerClusterGroup>
        <Markers data={props.vacancies} />
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map
