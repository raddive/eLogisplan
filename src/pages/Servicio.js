import React, { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import PagesHeader from '../components/PagesHeader';
import { Image } from 'primereact/image';
import { callWS, HHMM_to_String } from "../components/utils";

import img_bt_uncheck from "../images/img_bt_uncheck.png"
import img_bt_info from "../images/img_bt_info.png"
import img_bt_warning from "../images/img_bt_warning.png"
import img_bt_map from "../images/img_bt_map.png"


export default function Servicio (props) { 
   const location = useLocation();
   let { numServicio,numParticion } = location.state;
  
   const userContext = React.useContext(UserContext);
   const [infoServicio,setInfoServicio] =useState(props.infoServicio);
   const [error,setError] = useState("");


   useEffect( () => {
      getInfoServicio();
    },[]);


    function getInfoServicio()
    {
      if(userContext.userData && numServicio && numParticion)
      {
         const params = {  rquest:"getInfoServicio",
                           fecha: userContext.userData.date, 
                           codigoServicio:numServicio,
                           particion:numParticion,
                           empresa:"Distribucion"};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setInfoServicio(data);
               return;
         })
         .catch((error) => {
            setError(error.message);
         });
      }    
    }

   return (
   <UserDataConsumer>
      {user => (
         <ResourceDataConsumer>
            {resource => (
               <div className="grid max-w-screen">
                  <div className="col-7 hidden max-h-screen
                                 lg:flex">
                     <img className="w-full pl-5" src="./images/imgLandingLeft.png" alt="CityNight" />
                  </div>
                  <div className="col-12
                            lg:col-5 lg:col-offset-0">
                     <div className='m-4 bg-white h-full text-left'>
                        <PagesHeader
                           logOut={userContext.logOut}
                           infoUser={null}
                           infoResource={null}
                           
                        />
                        <p className="text-3xl text-red-500">{error}</p>
                        {infoServicio && (
                           <span className='stopPointList grid p-3 m-3 '>
                              <div className="col-3 text-left"> 
                              <Image className='stopPoint_bt' src={img_bt_uncheck} alt="LogoEvolution" />
                              </div>
                              <div className="col-9 text-right"> 
                              <Link to="/warning" state={{ from: "viaje",Servicio:infoServicio[0],numServicio:numServicio,numParticion:numParticion}}><Image className='stopPoint_bt' src={img_bt_warning} alt="WarningButton" /></Link>
                              <a href="https://maps.google.es" target="_blank"><Image className='stopPoint_bt' src={img_bt_map} alt="MapButton" /></a>
                              </div>
                              <span className='col-12 bg-orange-100'>
                                 <span>#Servicio : {numServicio} ({numParticion})</span><br/>
                                 <span>{infoServicio[0].NombreDestino}</span><br/>
                                 <span className='text-base'>{infoServicio[0].CPDestino},{infoServicio[0].CiudadDestino},</span><br/><br/>
                                 <span >Totales : {infoServicio[0].Cantidad1.toLocaleString()} kgs. {infoServicio[0].Cantidad2} lts.</span><br/><br/>
                              </span>
                              <span className='col-12'>
                                 <span >Hora de carga : {HHMM_to_String(infoServicio[0].HoraCarga)} - {HHMM_to_String(infoServicio[0].HoraCargaSalida)}</span><br/>
                                 <span >Hora de servicio : {HHMM_to_String(infoServicio[0].HoraDestino)} - {HHMM_to_String(infoServicio[0].HoraDestinoSalida)}</span><br/>
                                 <span >Lineas de pedido </span><br/>
                                 <span className='productsList grid mt-2'>
                                    <span className='col-6 text-left'>{infoServicio[0].NombreProducto}</span><br/>
                                    <span className='col-3 text-right'>{infoServicio[0].Cantidad1} kgs.</span><br/>
                                    <span className='col-3 text-right'>{infoServicio[0].Cantidad2} lts.</span><br/>

                                 </span>
                                 <span >Observaciones : <br/>{infoServicio[0].Observaciones1}</span><br/>
                                 <span >Incidencias : <br/><span dangerouslySetInnerHTML={{__html: infoServicio[0].Observaciones2}}></span></span><br/>
                              </span>
                           </span>
                        )}
                     </div>
                  </div>
               </div>
            )}
         </ResourceDataConsumer>
      )}
   </UserDataConsumer>
   );
};