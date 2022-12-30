import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'
import Markers from './Markers'
import Button from '../button/Button'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import './Markers.css'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const ControlsMapButtons = ({ isHideMap, isMobile, onHideMap }) => {
  return (
    <div className="controls__map__div">
      <Button
        bgColor="#229fd9"
        fill="white"
        icon={
          isHideMap
            ? 'M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z'
            : 'M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z'
        }
        onClickHandler={() => onHideMap(!isHideMap)}
        display={isMobile ? 'flex' : 'none'}
      ></Button>
    </div>
  )
}

const Map = (props) => {
  const [map, setMap] = React.useState(null)

  const mapWrapperStyles = {
    mobile: {
      width: '100%',
      left: '0px',
      right: '0px',
      position: 'relative',
      height: '96px',
      overflow:
        props.isHideMap && props.size['mobile'].value ? 'visible' : 'hidden',
    },
    desktop: {
      width:
        props.size['window'].width <= '1280'
          ? 'calc(100% - 50vw)'
          : 'calc(100% - 700px)',
      top: '0px',
      right: '0px',
      position: 'fixed',
      overflow: 'hidden',
      zIndex: '1',
    },
  }

  const mapButtonStyles = {
    mobile: {
      flex: '0 0 auto',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundImage: 'url(https://apteka.103.by/images/map_mask.png)',
      backgroundPosition: '50% 50%',
      zIndex: '2',
      display: props.size['mobile'].value && props.isHideMap ? 'none' : 'block',
    },
    desktop: {
      display: 'none',
      height: '120px',
      width: '100%',
      position: 'relative',
      zIndex: '501',
      border: '0',
      padding: '0',
      background: 'transparent',
    },
  }

  React.useEffect(() => {
    if (map && props.selectedMarker) {
      map.fitBounds(
        [
          {
            lat: props.selectedMarker.lat,
            lng: props.selectedMarker.lng,
          },
        ],
        { duration: 0.25 }
      )
    }
  }, [map, props.selectedMarker])

  React.useEffect(() => {
    if (!map) {
      return
    }

    map.on('click', (e) => {
      if (props.selectedMarker) {
        props.setIsShowPopUpMarker(false)
      }
    })

    return null
  }, [map, props])

  return (
    <div
      className="map__wrapper"
      style={
        props.size['mobile'].value
          ? mapWrapperStyles['mobile']
          : mapWrapperStyles['desktop']
      }
    >
      <button
        className="map__button"
        style={
          props.size['mobile'].value
            ? mapButtonStyles['mobile']
            : mapButtonStyles['desktop']
        }
        onClick={props.onHideMap}
      >
        <span className="map__button--count">
          <span className="map__button__count--number">
            {props.vacancies ? props.vacancies.length : 0}
          </span>
          <span className="map__button__count--caption">Показать</span>
        </span>
      </button>
      <MapContainer
        id="map"
        whenCreated={setMap}
        zoomControl={false}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{
          height: '100vh',
          zIndex: '1',
        }}
        onClick={() => console.log('cl')}
      >
        <ZoomControl position={'bottomright'} />
        <Tile />
        <ControlsMapButtons
          isHideMap={props.isHideMap}
          onHideMap={props.onHideMap}
          isMobile={props.size['mobile'].value}
        />
        <MarkerClusterGroup showCoverageOnHover={false}>
          <Markers
            map={map}
            data={props.vacancies}
            onSelectedMarker={props.onSelectedMarker}
            selectedMarker={props.selectedMarker}
            center={center}
          />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default Map
