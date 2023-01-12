import React, { useEffect,useState } from 'react';
import {Link, Navigate } from "react-router-dom";
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import Moment from 'moment';


import AdminHeader from "../components/AdminHeader";
import AdminTablaRecursos from '../components/AdminTablaRecursos';
import AdminTablaViajes from '../components/AdminTablaViajes';
import Servicio from './Servicio';


import { callWS } from "../components/utils";

export default function AdminPlan (props) { 

   const userContext = React.useContext(UserContext);
   const resourceContext = React.useContext(ResourceContext);
   const [infoRecursos,setInfoRecursos] = useState([]);
   const [detalleRecurso,setDetalleRecurso] = useState([]);
   const [selRecurso,setSelRecurso] = useState({});
   const [selServicio,setSelServicio] = useState({});
   const [panelDerecho,setPanelDerecho] = useState(0);
   const [error,setError] = useState("");
   const formatDate = Moment().format('DD-MM-YYYY')


   //Leyendo data desde una API
    //utilizamoa useEffect,[] porque solo se llama una vez
   useEffect( () => {
      getInfoRecursos();
    },[]);

    useEffect( () => {
      setPanelDerecho(0);
      getDetalleRecurso();
    },[selRecurso]);

    useEffect( () => {
      //setPanelDerecho(1);
      // getDetalleServicio();

   },[selServicio]);




   function getInfoRecursos()
    {
      // if(userContext.fecha && userContext.empresa)
      {
         const params = {  rquest:"getInfoRecursos",
                           fecha: formatDate, 
                           empresa:"Distribucion"};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setInfoRecursos(data);
               return;
         })
         .catch((error) => {
            setError(error.message);
         });
      }    
    }

    function getDetalleRecurso()
    {
      // if(userContext.fecha && userContext.empresa)
      {
         const params = {  rquest:"getViajesRecurso",
                           // fecha: userContext.userData.date, 
                           fecha: formatDate,
                           empresa:"Distribucion",
                           full_info:1,
                           codigoConductor:selRecurso.codConductor,
                           codigoTractora:selRecurso.codTractora,
                           codigoCisterna:selRecurso.codCisterna
                        };
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setDetalleRecurso(data);
               return;
         })
         .catch((error) => {
            setError(error.message);
         });
      }    
    }

    function onAdminLogout(){
      console.log("logout desde plan");
      return <Navigate to='/admin' />
    }
    
   
 return (
   <UserDataConsumer>
      {user => (
         <ResourceDataConsumer>
            {resource => (
               <div className="grid mx-3 ">
                  <div className="col-12">
                     <AdminHeader 
                        logOut={userContext.adminLogOut}/>
                  </div>
                  <div className="col-6">
                     <div className='mx-5 bg-white pb-3'>
                        <AdminTablaRecursos
                           date={formatDate}
                           data={infoRecursos}
                           selRecurso={setSelRecurso}
                           setPanelDerecho
                        />
                     </div>
                  </div>
                  <div className="col-6">
                     {panelDerecho ===0 && selRecurso.codConductor && (
                     <div className='m-5 bg-white pb-3'>
                     <AdminTablaViajes
                              date={formatDate}
                              data={detalleRecurso}
                              selServicio={setSelServicio}
                              setPanelDerecho
                           />
                     </div>
                     )}
                     {panelDerecho ===1 && selServicio.codPedido && (
                        <div className='m-5 bg-white pb-3'>
                           {selServicio.codPedido}{selServicio.particion}
                           <Servicio
                              numServicio={selServicio.codPedido}
                              numParticion={selServicio.particion}
                           />
                        </div>
                     )}
                  </div>
               </div>
            )}
         </ResourceDataConsumer>
      )}
   </UserDataConsumer>
);};