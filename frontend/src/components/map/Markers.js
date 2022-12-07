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

const Markers = ({ data }) => {
  if (data) {
    return data.map(({ lat, lng, keySkill }, index) => (
      <Marker
        icon={pointerIcon(keySkill)}
        key={index}
        position={{ lat, lng }}
      ></Marker>
    ))
  }

  return null
}

export default Markers
