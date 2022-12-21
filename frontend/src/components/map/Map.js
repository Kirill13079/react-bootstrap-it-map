import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Tile from './Tile'
import Markers from './Markers'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const center = [53.893009, 27.567444] // Minsk
const zoom = 6

const CloseMap = ({ visible, onCloseMap }) => {
  if (visible) {
    return (
      <div className="close__map--button leaflet-control" onClick={onCloseMap}>
        <div className="close__map__button--content">
          <svg viewBox="0 0 24 24">
            <path d="M14,10a2,2,0,1,1-2-2A2.006,2.006,0,0,1,14,10Zm5.5,0c0,6.08-4.67,9.89-6.67,11.24a1.407,1.407,0,0,1-.83.26,1.459,1.459,0,0,1-.84-.26C9.16,19.89,4.5,16.09,4.5,10A7.33,7.33,0,0,1,12,2.5,7.336,7.336,0,0,1,19.5,10ZM16,10a4,4,0,1,0-4,4A4,4,0,0,0,16,10Z"></path>
          </svg>
        </div>
      </div>
    )
  }

  return null
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
    },
    desktop: {
      width: 'calc(100% - 50vh)',
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
      display:
        props.size['isMobile'].value && props.size['isHideMap'].value
          ? 'none'
          : 'block',
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

  return (
    <div
      className="map__wrapper"
      style={
        props.size['isMobile'].value || props.size['isHideMap'].value
          ? mapWrapperStyles['mobile']
          : mapWrapperStyles['desktop']
      }
    >
      <button
        className="map__button"
        style={
          props.size['isMobile'].value || props.size['isHideMap'].value
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
        whenCreated={setMap}
        zoomControl={false}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100vh', zIndex: props.size ? '1' : '2' }}
      >
        <ZoomControl position={'bottomright'} />
        <Tile />
        <CloseMap
          visible={
            props.size['isMobile'].value && props.size['isHideMap'].value
          }
          onCloseMap={props.onHideMap}
        ></CloseMap>
        <MarkerClusterGroup>
          <Markers
            map={map}
            data={props.vacancies}
            onSelectedMarker={props.onSelectedMarker}
          />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default Map
