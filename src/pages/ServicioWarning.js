import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import PagesHeader from '../components/PagesHeader';
import { InputTextarea } from 'primereact/inputtextarea';
import { callWS, HHMM_to_String } from "../components/utils";
import { Image } from 'primereact/image';

import img_bt_uncheck from "../images/img_bt_uncheck.png"

export default function ServicioWarning (props) { 
   const location = useLocation();
   const navigate = useNavigate();
   let { numServicio,numParticion,Servicio } = location.state;
  
   const userContext = React.useContext(UserContext);
   const [infoServicio,setInfoServicio] =useState(Servicio);
   const [warning,setWarning]=useState("");
   const [error,setError] = useState("");


   function addWarning(){
      const params = {  rquest:"addIncidencia",
                        body:{fecha: userContext.userData.date, 
                              codigoServicio:numServicio,
                              particion:numParticion,
                              empresa:"Distribucion",
                              incidencia:warning}
                     };
      callWS("POST",params,error)
      .then(data =>   { 
            setError("");
            return navigate(-1);
      })
      .catch((error) => {
         setError(error.message);
      });
   };

   return (
   <UserDataConsumer>
      {user => (
         <ResourceDataConsumer>
            {resource => (
               <div className="grid max-w-screen ml-0">
                  <div className="col-5 col-offset-1 hidden max-h-screen lg:flex">
                  <Image className="flex align-content-start justify-content-center flex-wrap p-5" imageStyle={{width:"100%", height:"auto"}} src="./images/imgLandingLeft.png" alt="CityNight" />
                  </div>
                  <div className="col-12 lg:col-5 lg:col-offset-0">
                     <div className='m-5 bg-white h-full text-left pb-3'>
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
                              <span className='col-12 bg-orange-100'>
                                 <span>#Servicio : {numServicio} ({numParticion})</span><br/>
                                 <span>{infoServicio.NombreDestino}</span><br/>
                                 <span className='text-base'>{infoServicio.CPDestino},{infoServicio.CiudadDestino},</span><br/><br/>
                                 <span >Totales : {infoServicio.Cantidad1.toLocaleString()} kgs. {infoServicio.Cantidad2} lts.</span><br/><br/>
                              </span>
                              <span className='col-12'>
                                 <span >Hora de carga : {HHMM_to_String(infoServicio.HoraCarga)} - {HHMM_to_String(infoServicio.HoraCargaSalida)}</span><br/>
                                 <span >Hora de servicio : {HHMM_to_String(infoServicio.HoraDestino)} - {HHMM_to_String(infoServicio.HoraDestinoSalida)}</span><br/>
                                 <span >Observaciones : <br/>{infoServicio.Observaciones1}</span><br/>
                                 <span >Incidencias : <br/><span dangerouslySetInnerHTML={{__html: infoServicio.Observaciones2}}></span></span><br/>
                                 <span className='text-base'>Nueva incidencia</span><br/>
                                 <InputTextarea rows={7} cols={60} onChange={(e) => setWarning(e.target.value)} ></InputTextarea>
                                 <button type="button" onClick={addWarning}
                                 className="small col-offset-8 col-4 text-white bg-primary-500 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                                 transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 
                                 active:bg-primary-700 active:border-primary-700">ACEPTAR</button>
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