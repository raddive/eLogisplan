import L, { icon } from "leaflet";
import React,{useState,useEffect} from "react";
import { MapContainer, TileLayer, Marker,Polyline,FeatureGroup,useMap,LayerGroup,Circle } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'


function SetBounds(props) {
    const [limits, setLimits] = useState();
    const [center, setCenter] = useState();
    const map = useMap()
    useEffect(() => {
        CenterMap();
    },[]);

    function onFitClick() {
        CenterMap();
    };

    function CenterMap() {
        setLimits(props.markers);
        if(props.markers.length===1)
            map.fitBounds(props.markers,{ padding: [10,10], maxZoom:17});
        else
            map.fitBounds(props.markers,{ padding: [10,10]});
        setCenter(map.getCenter());
    }



    return (
        <div className="leaflet-bottom leaflet-left">
            <button onClick={onFitClick} className="leaflet-control">CENTRAR</button>
        </div>

    )
}


export default function MyMapContainer(props) {
  const [basePoint,setBasePoint] = useState();
  const [loadPoint,setLoadPoint] = useState();
  const [customerPoint,setCustomerPoint] = useState();
  const [polyline,setPolyline] = useState([]);
  const lineOptions = { color: 'orange' }
  
    useEffect( () => {
        setPolyline([]);
        if(props.basePoint)
        {
            setBasePoint(props.basePoint);
            const aux=[props.basePoint.lat,props.basePoint.long];
            setPolyline(prev => [...prev,aux])
        }
        if(props.loadPoint)
        {    
            setLoadPoint({"nombre":props.loadPoint.NombreCarga,"lat":props.loadPoint.Carga_Coord_Latitude,"long":props.loadPoint.Carga_Coord_Longitude});
            const aux=[props.loadPoint.Carga_Coord_Latitude,props.loadPoint.Carga_Coord_Longitude];
            setPolyline(prev => [...prev,aux])
        }
        if(props.customerPoint){
            setCustomerPoint({"nombre":props.customerPoint.NombreDestino,"lat":props.customerPoint.Descarga_Coord_Latitude,"long":props.customerPoint.Descarga_Coord_Longitude});
            const aux=[props.customerPoint.Descarga_Coord_Latitude,props.customerPoint.Descarga_Coord_Longitude];
            setPolyline(prev => [...prev,aux])

        }
        if(props.markerList && props.markerList.length>1)
        {
            props.markerList.map(item => {
                const aux=[item[0],item[1]];
                setPolyline(prev => [...prev,aux])
            })
        }
    },[]);


    const iconGreen = L.icon({
        iconUrl: '/images/marker_green.png',
        iconSize: [38, 66],
        iconAnchor: [19, 66],
        popupAnchor: [-3, -76],
        shadowUrl: 'images/marker_shadow.png',
        shadowSize: [40, 50],
        shadowAnchor: [0, 50]
    });
    const iconBlue = L.icon({
        iconUrl: '/images/marker_blue.png',
        iconSize: [38, 66],
        iconAnchor: [19, 66],
        popupAnchor: [-3, -76],
        shadowUrl: 'images/marker_shadow.png',
        shadowSize: [40, 50],
        shadowAnchor: [0, 50]
    });
    const iconOrange = L.icon({
        iconUrl: '/images/marker_orange.png',
        iconSize: [38, 66],
        iconAnchor: [19, 66],
        popupAnchor: [-3, -76],
        shadowUrl: 'images/marker_shadow.png',
        shadowSize: [40, 50],
        shadowAnchor: [0, 50]
    });
  return (
    <>
    
    <MapContainer
        style={{width:"90vh", height:"90vh"}}
        className="m-3"
        center={[42.366, -3.648]}
        zoom={customerPoint?12:8}
        maxZoom={18}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
            {basePoint && ( <Marker icon={ iconGreen} position={[basePoint.lat,basePoint.long]} />)}
            {loadPoint && (<Marker icon={ iconBlue} position={[loadPoint.lat,loadPoint.long]} /> )}
            {customerPoint && (<Marker icon={ iconOrange} position={[customerPoint.lat, customerPoint.long]} /> )}
            {Array.isArray(props.markerList) && props.markerList.length!==0 && (
                props.markerList.map((location,index) => (
                    <Marker key={index}
                        icon={iconOrange}
                        position={{ lat: location[0], lng: location[1] }}
                    >
                    </Marker>
                ))
            )}
            {Array.isArray(polyline) && polyline.length!==0 && (
                <>
                    <Polyline pathOptions={lineOptions} positions={polyline} />
                    <SetBounds 
                        markers={polyline} />
                </>
            )}
        </FeatureGroup>
    </MapContainer>
    </>
  )
}
