import React, { useEffect,useState } from 'react';
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import { Image } from 'primereact/image';
import img_Landing from "../images/img_Landing.png"



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
         const params = { rquest:"getDatosRecurso",codigoConductor:userContext.userData.code,empresa:userContext.userData.empresa};
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
                           empresa:userContext.userData.empresa};
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
               <div className="grid max-w-screen ml-0 ">
                  <div className="col-5 col-offset-1 hidden lg:flex">
                     <Image className="flex align-content-start justify-content-center flex-wrap p-5" imageStyle={{width:"100%", height:"auto"}} src={img_Landing} alt="CityNight" />
                  </div>
                  <div className="col-12 lg:col-5 lg:col-offset-0">
                     <div className='m-5 bg-white max-h-screen pb-3'>
                        {viajesRecurso[0] && (
                           <PagesHeader
                              logOut={userContext.logOut}
                              infoUser={userContext.userData}
                              infoResource={resourceContext.resourceData}
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