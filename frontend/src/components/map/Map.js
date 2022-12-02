import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'
import Markers from './Markers'

import 'leaflet/dist/leaflet.css'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const Map = () => {
  const [map, setMap] = React.useState(null)
  const [vacancies, setVacancies] = React.useState(null)

  React.useEffect(() => {
    const getVacancies = () => {
      fetch('http://localhost:5000/')
        .then((res) => res.json())
        .then((result) => {
          setVacancies(result)
        })
    }

    getVacancies()
  }, [])

  return (
    <MapContainer
      zoomControl={false}
      whenCreated={setMap}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}
    >
      <ZoomControl position={'bottomright'} />
      <Tile />
      <Markers data={vacancies} />
    </MapContainer>
  )
}

export default Map
