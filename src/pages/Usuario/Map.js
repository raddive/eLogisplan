import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";

export default function Map() {
  
  return (
    <div>
        <h1>HOLA</h1>
        <MapContainer
            style={{width:"90vh", height:"90vh"}}
            className="m-3"
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           />
        </MapContainer>
    </div>
  )
}
