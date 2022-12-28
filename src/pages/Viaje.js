import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom'
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import PagesHeader from '../components/PagesHeader';
import { callWS } from "../components/utils";
import StopPointItem from '../components/StopPointItem';
import LoadPointItem from '../components/LoadPointItem';

export default function Viaje (props) { 
 const location = useLocation();
 let { from,numViaje } = location.state;
 from="/"+from;

 const userContext = React.useContext(UserContext);
 const resourceContext = React.useContext(ResourceContext);
 const [error,setError] = useState("");
 const [stopPoints,setStopPoints] = useState([]);
 const [loadPointInfo,setLoadPointInfo] =useState();
 const [stopPointList,setStopPointList] =useState();
 
 useEffect( () => {
   getInfoViaje();
 },[]);

 useEffect( () => {
      setLoadPointInfo(stopPoints[0]);
      const auxStopPointList = stopPoints.map((item,index) => {
         return (
               <StopPointItem key={index}
                  info={item}
               />
         )
      })
      setStopPointList(auxStopPointList);
 },[stopPoints]);



 function getInfoViaje()
    {
      if(resourceContext.resourceData && numViaje)
      {
         const params = {  rquest:"getViajesRecurso",
                           fecha: userContext.userData.date, 
                           codigoConductor:resourceContext.resourceData.conductor,
                           codigoTractora:resourceContext.resourceData.tractora,
                           codigoCisterna:resourceContext.resourceData.cisterna,
                           viaje: numViaje,
                           empresa:"Distribucion"};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setStopPoints(data);
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
                     <div className='m-4 bg-white h-full text-left pb-3'>
                        {stopPoints[0] && (
                           <PagesHeader
                              logOut={userContext.logOut}
                              infoUser={userContext.userData}
                              infoResource={resourceContext.resourceData}
                              inicio={stopPoints[0].HoraInicioViaje}
                              fin={stopPoints[0].HoraFinViaje}
                           />
                        )}
                        <p className="text-3xl text-red-500">{error}</p>
                        <span className='p-3'>Viaje: {numViaje}</span>
                        {loadPointInfo && (
                           <div className='stopPointList'>
                              <LoadPointItem 
                                 info={loadPointInfo}/>
                           </div>
                        )}
                        {stopPointList && (
                           <div className='stopPointList'>
                              {stopPointList}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}
         </ResourceDataConsumer>
      )}
   </UserDataConsumer>
);};