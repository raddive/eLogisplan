import React, { useEffect,useState } from 'react';
import { Image } from 'primereact/image';

import { UserDataConsumer,UserContext } from "contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "contexts/resourceData";

import img_LogoeLogisplan from "images/logoeLogisplan.png"

import ViajeItem from 'components/ViajeItem';
import PagesHeader from 'components/PagesHeader';
import PagesTopBar from 'components/PagesTopBar';

import { callWS } from "components/utils";

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect( () => {
      if(resourceContext.resourceData.conductor!=="")
      {
         getViajesRecurso();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
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
               <div className="grid max-w-screen h-screen  ml-0 ">
                  <div className="col-6 hidden my-auto lg:flex lg:flex-column">
                     <PagesTopBar
                        left={true}
                        logOut={userContext.logOut}
                     />
                     <Image className="" src={img_LogoeLogisplan} imageStyle={{width:"60%", height:"auto"}}  alt="eLogisplanLogo" />
                  </div>
                  <div className="col-12 lg:col-6 flex flex-column bg-orange-100 flex align-content-center justify-content-top">
                     <PagesTopBar
                        right={true}
                        showBack={false}
                        logOut={userContext.logOut}
                     />
                     <div className="card surface-50 shadow-5 lg:h-auto sm:h-screen px-3 py-5 lg:mx-5 ">
                           {viajesRecurso[0] && (
                              <PagesHeader
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