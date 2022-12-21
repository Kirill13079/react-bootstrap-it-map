import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import L from 'leaflet'

const pointerIcon = (skill) => {
  return new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/images/pin_${skill}.png`,
    iconSize: [50, 58],
    iconAnchor: [20, 58],
    popupAnchor: [0, -60],
  })
}

const pointerIconActive = () => {
  return new L.Icon({
    iconUrl: '../data/pin_net.png',
    iconSize: [50, 58],
    iconAnchor: [20, 58],
    popupAnchor: [0, -60],
  })
}

const MarkerPopup = (key) => {
  return <p>{key}</p>
}

const Markers = ({ map, data, onSelectedMarker }) => {
  const [test, setTest] = React.useState(null)

  const m = (key) => {
    alert(key)
  }

  if (data) {
    return data.map((item, index) => (
      <Marker
        icon={pointerIcon(item.keySkill)}
        key={index}
        position={{ lat: item.lat, lng: item.lng }}
        eventHandlers={{
          click(e) {
            const location = e.target.getLatLng()
            map.flyToBounds([location])

            onSelectedMarker(item)
          },
        }}
      ></Marker>
    ))
  }

  return null
}

export default Markers
