import React from 'react'
import { Marker } from 'react-leaflet'
import L from 'leaflet'

import './Markers.css'

const pointerIcon = (skill) => {
  return new L.divIcon({
    className: 'marker__icon--wrapper',
    html: `<div class="marker__icon">
    <div class="marker__icon--image">
    <img src="${process.env.PUBLIC_URL}/images/gory_noch_sneg_vershina_114039_1920x1080.jpg" />
    </div><span>${skill}</span></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -60],
  })
}

const pointerIconSelected = (skill) => {
  return new L.divIcon({
    className: 'marker__icon--wrapper',
    html: `<div class="marker__icon--selected"> <div class="marker__icon--image">
    <img src="${process.env.PUBLIC_URL}/images/gory_noch_sneg_vershina_114039_1920x1080.jpg" />
    </div>
    <span class="drugStoreMarker__selectedMarker">
    <span class="drugStoreMarker__price">${skill}</span>
    <span class="drugStoreMarker__dot"></span>
    </span></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -60],
  })
}

const Markers = ({ data, onSelectedMarker, selectedMarker }) => {
  if (data) {
    return data.map((item, index) => (
      <Marker
        icon={
          item === selectedMarker
            ? pointerIconSelected(item.keySkill)
            : pointerIcon(item.keySkill)
        }
        key={index}
        position={{ lat: item.lat, lng: item.lng }}
        eventHandlers={{
          click(e) {
            onSelectedMarker(item)
          },
        }}
      ></Marker>
    ))
  }

  return null
}

export default Markers
