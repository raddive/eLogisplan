import React, { useEffect,useState,useRef } from 'react';
import { useLocation } from 'react-router-dom'
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';

import { UserDataConsumer,UserContext } from "contexts/userData";
import { ResourceDataConsumer } from "contexts/resourceData";

import PagesHeader from 'components/PagesHeader';
import PagesTopBar from 'components/PagesTopBar';
import MyMapContainer from 'components/MyMapContainer';

import { callWS, HHMM_to_String,chechUncheckStopPoint } from "components/utils";

import img_bt_uncheck from "images/img_bt_uncheck.png"
import img_bt_check from "images/img_bt_check.png"
import img_bt_warning from "images/img_bt_warning.png"
import img_bt_map from "images/img_bt_map.png"

export default function Servicio (props) { 
   const location = useLocation();

   let numServicio,numParticion;
   if(location.state){
      numServicio=location.state.numServicio
      numParticion = location.state.numParticion;
   }
   else
   {
      numServicio=props.numServicio
      numParticion = props.numParticion;
   }
  
   const userContext = React.useContext(UserContext);
   const [infoServicio,setInfoServicio] =useState();
   const [checked,setChecked] = useState(false);
   const [checkedImage,setCheckedImage] = useState(img_bt_check);
   const [viewWarning,setViewWarning]=useState(props.warning);
   const [warning,setWarning]=useState("");
   const [error,setError] = useState("");

   const toastBC = useRef(null);


   useEffect( () => {
       getInfoServicio();
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);


   useEffect(() => {
      if(infoServicio)  
          setChecked(infoServicio.HoraRealDestino?true:false);
   },[infoServicio]);

   useEffect(() => {
       setCheckedImage(checked?img_bt_check:img_bt_uncheck);
       getInfoServicio();

       // eslint-disable-next-line react-hooks/exhaustive-deps
   },[checked,viewWarning]);


   const showConfirm = () => {
      if(checked)
      {
         toastBC.current.show({ closable:false, severity: 'warn', sticky: true, content: (
            <div className="flex flex-column" style={{flex: '1'}}>
               <div className="text-center">
                     <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                     <h4>¿Está seguro de anular la confirmación?</h4>
                     <p>Confirma para seguir</p>
               </div>
               <div className="grid p-fluid">
                     <div className="col-6">
                        <Button onClick={onHandleCheck} type="button" label="Sí" className="p-button-success" />
                     </div>
                     <div className="col-6">
                        <Button on onClick={clearToast} type="button" label="No" className="p-button-secondary" />
                     </div>
               </div>
            </div>     
         )})
      }else{
         onHandleCheck();
      }
  }

   function clearToast()
   {
      toastBC.current.clear();
   }
   function onHandleCheck()
   {
       let error="";
       chechUncheckStopPoint(error, !checked, infoServicio.CodigoPedido,infoServicio.ParticionPedido)
       setChecked(prev=> !prev);
       clearToast();
   }

    function getInfoServicio()
    {
      if(userContext.userData && numServicio && numParticion)
      {
         const params = {  rquest:"getInfoServicio",
                           fecha: userContext.userData.date, 
                           codigoServicio:numServicio,
                           particion:numParticion,
                           empresa:userContext.userData.empresa};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setInfoServicio(data[0]);
               return;
         })
         .catch((error) => {
            setError(error.message);
         });
      }    
    }

    function onViewWarning()
    {
      setViewWarning(true);
    }

    function addWarning(){
      if(warning!=="")
      {
         const params = {  rquest:"addIncidencia",
                           body:{fecha: userContext.userData.date, 
                                 codigoServicio:numServicio,
                                 particion:numParticion,
                                 empresa:process.env.REACT_APP_EMPRESA,
                                 incidencia:warning}
                        };
         callWS("POST",params,error)
         .then(data =>   { 
               setError("");
               setViewWarning(false);
         })
         .catch((error) => {
            setError(error.message);
         });
      }
      else
      {
         setViewWarning(false);
         return;
      }
   };

   const textColor=(infoServicio && infoServicio.HoraDestinoSalida<infoServicio.HoraRealDestino)?"text-red-500 text-xl":"text-green-700 text-xl";

   return (
   <UserDataConsumer>
      {user => (
         <ResourceDataConsumer>
            {resource => (
               <div className="grid max-w-screen  h-screen ml-0">
                  <div className="col-5 col-offset-1 hidden my-auto mx-auto lg:flex lg:flex-column">
                     <PagesTopBar
                        left={true}
                        logOut={userContext.logOut}
                     />
                     {infoServicio  && (
                        <MyMapContainer 
                           basePoint ={null}
                           loadPoint ={null}
                           customerPoint = {infoServicio}
                           markerList = {null}/>
                        )}
                  </div>
                  <div className="col-12 lg:col-6 flex flex-column bg-orange-100 flex align-content-center justify-content-top h-screen overflow-hidden">
                     <PagesTopBar
                        right={true}
                        showBack={true}
                        logOut={userContext.logOut}
                     />
                     <div className="card surface-50 shadow-5 lg:h-auto sm:h-screen px-3 py-5 lg:mx-5 overflow-auto text-left">
                        <PagesHeader
                           logOut={userContext.logOut}
                           infoUser={null}
                           infoResource={null}
                        />
                        <p className="text-3xl text-red-500">{error}</p>
                        {infoServicio && (
                           <span className='stopPointList grid p-3 m-3 '>
                              <div className="col-5 text-left flex align-items-center"> 
                                 <Toast ref={toastBC} position="top-center" />
                                 <Image onClick={showConfirm} className='stopPoint_bt' src={checkedImage} alt="confirm" />
                                 {checked===true && infoServicio.HoraRealDestino!=="" && (<span className={textColor}>{HHMM_to_String(infoServicio.HoraRealDestino)}</span>)}
                              </div>

                              <div className="col-7 text-right"> 
                              {/* <Link to="/warning" state={{ from: "viaje",Servicio:infoServicio,numServicio:numServicio,numParticion:numParticion}}><Image className='stopPoint_bt' src={img_bt_warning} alt="WarningButton" /></Link> */}
                              <Image onClick={onViewWarning} className='stopPoint_bt' src={img_bt_warning} alt="WarningButton" />
                              <a href={"https://maps.google.com/?q="+infoServicio.Descarga_Coord_Latitude+","+infoServicio.Descarga_Coord_Longitude} target="_blank" rel="noreferrer"><Image className='stopPoint_bt' src={img_bt_map} alt="MapButton" /></a>
                              </div>
                              <span className='col-12 surface-100'>
                                 <span>#Servicio : {numServicio} ({numParticion})</span><br/>
                                 <span>{infoServicio.NombreDestino}</span><br/>
                                 <span className='text-base'>{infoServicio.CPDestino},{infoServicio.CiudadDestino},</span><br/><br/>
                                 <span >Totales : {infoServicio.Cantidad1.toLocaleString()} kgs. {infoServicio.Cantidad2} lts.</span><br/><br/>
                              </span>
                              <span className='col-12'>
                                 <span >Hora de carga : {HHMM_to_String(infoServicio.HoraCarga)} - {HHMM_to_String(infoServicio.HoraCargaSalida)} {infoServicio.HoraRealCarga && (<span className='text-green-700 text-3xl'>({HHMM_to_String(infoServicio.HoraRealCarga)})</span>)}</span><br/>
                                 <span >Hora de servicio : {HHMM_to_String(infoServicio.HoraDestino)} - {HHMM_to_String(infoServicio.HoraDestinoSalida)} {infoServicio.HoraRealDestino && (<span className='text-green-700 text-3xl'>({HHMM_to_String(infoServicio.HoraRealDestino)})</span>)}</span><br/>
                                 <span >Lineas de pedido </span><br/>
                                 <span className='productsList grid mt-2'>
                                    <span className='col-6 text-left'>{infoServicio.NombreProducto}</span><br/>
                                    <span className='col-3 text-right'>{infoServicio.Cantidad1} kgs.</span><br/>
                                    <span className='col-3 text-right'>{infoServicio.Cantidad2} lts.</span><br/>

                                 </span>
                                 <span >Observaciones : <br/>{infoServicio.Observaciones1}</span><br/>
                                 <span >Incidencias : <br/><span dangerouslySetInnerHTML={{__html: infoServicio.Observaciones2}}></span></span><br/>
                                 {viewWarning===true && (
                                    <>
                                       <span className='text-base'>Nueva incidencia</span><br/>
                                       <InputTextarea rows={7} cols={55} onChange={(e) => setWarning(e.target.value)} ></InputTextarea>
                                       <button type="button" onClick={addWarning}
                                       className="small col-offset-8 col-4 text-white bg-orange-400 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                                       transition-all transition-duration-200 hover:bg-orange-500 hover:border-primary-600 
                                       active:bg-primary-700 active:border-primary-700">ACEPTAR</button>
                                    </>
                                 )}
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