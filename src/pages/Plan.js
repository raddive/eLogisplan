import React, { useEffect,useState } from 'react';
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";

import ViajeItem from '../components/ViajeItem';
import PagesHeader from '../components/PagesHeader';

import { callWS } from "../components/utils";

export default function Plan (props) { 

   const userContext = React.useContext(UserContext);
   const resourceContext = React.useContext(ResourceContext);
   const [viajesRecurso,setViajesRecurso] = useState([]);
   const [listaViajes,setListaViajes] = useState([]);
   const [error,setError] = useState("");

   //Leyendo data desde una API
    //utilizamoa useEffect,[] porque solo se llama una vez
   useEffect( () => {
      getInfoRecurso();
    },[]);

    useEffect( () => {
      if(resourceContext.resourceData.conductor!=="")
      {
         getViajesRecurso();
      }

      
    },[resourceContext.resourceData]);

   

   useEffect( () => {
      if(viajesRecurso)
      {
         const auxListaViajes = viajesRecurso.map((item,index) => {
            return (
                  <ViajeItem key={index}
                     infoViaje={item}
                  />
            )
         })
         setListaViajes(auxListaViajes);
      }   
   },[viajesRecurso]);

    function getInfoRecurso()
    {
      if(userContext.userData.code)
      {
         const params = { rquest:"getDatosRecurso",codigoConductor:userContext.userData.code,empresa:"Distribucion"};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               resourceContext.setResource(data);
               return;
         })
         .catch((error) => {
            setError(error.message);
         });
      }    
    }


    function getViajesRecurso()
    {
      if(resourceContext.resourceData.conductor && resourceContext.resourceData.tractora && resourceContext.resourceData.cisterna)
      {
         const params = {  rquest:"getViajesRecurso",
                           fecha: userContext.userData.date, 
                           codigoConductor:resourceContext.resourceData.conductor,
                           codigoTractora:resourceContext.resourceData.tractora,
                           codigoCisterna:resourceContext.resourceData.cisterna,
                           empresa:"Distribucion"};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setViajesRecurso(data);
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
                     <div className='m-4 bg-white h-full pb-3'>
                        {viajesRecurso[0] && (
                           <PagesHeader
                              logOut={userContext.logOut}
                              infoUser={userContext.userData}
                              infoResource={resourceContext.resourceData}
                              inicio={viajesRecurso[0].HoraInicioViaje}
                              fin={viajesRecurso[0].HoraFinViaje}
                              />
                        )}
                        <p className="text-3xl text-red-500">{error}</p>
                        {listaViajes}
                     </div>
                  </div>
               </div>
            )}
         </ResourceDataConsumer>
      )}
   </UserDataConsumer>
);};