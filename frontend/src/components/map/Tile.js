import { TileLayer } from 'react-leaflet'

const tileLayer = {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

const Tile = () => {
  return <TileLayer {...tileLayer} />
}

export default Tile
