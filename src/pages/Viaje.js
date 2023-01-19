import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom'
import { UserDataConsumer,UserContext } from "../contexts/userData";
import { ResourceDataConsumer,ResourceContext } from "../contexts/resourceData";
import PagesHeader from '../components/PagesHeader';
import PagesTopBar from '../components/PagesTopBar';

import { callWS } from "../components/utils";
import StopPointItem from '../components/StopPointItem';
import LoadPointItem from '../components/LoadPointItem';
import MyMapContainer from '../components/MyMapContainer';

export default function Viaje (props) { 
 const location = useLocation();
//  let { from,numViaje } = location.state;
// from="/"+from;
 let { numViaje } = location.state;

 const userContext = React.useContext(UserContext);
 const resourceContext = React.useContext(ResourceContext);
 const [error,setError] = useState("");
 const [basePointInfo,setBasePointInfo] =useState({nombre:"BASE1",lat:42.46316,long:-3.85132});
 const [loadPointInfo,setLoadPointInfo] =useState();
 const [stopPoints,setStopPoints] = useState([]);
 const [stopPointList,setStopPointList] =useState([]);
 const [coordList,setCoordList] =useState([]);
 const [toggle, setToggle] = useState(false);
 
 useEffect( () => {
   getInfoViaje();
 },[]);

 useEffect(() => {
   getInfoViaje();
}, [toggle,props])

 useEffect( () => {
      if(Array.isArray(stopPoints) && stopPoints.length!==0)
      {
         setLoadPointInfo(stopPoints[0]);
         let points=[];
         const auxStopPointList = stopPoints.map((item,index) => {
            points.push([item.Descarga_Coord_Latitude,item.Descarga_Coord_Longitude]);
            return (
                  <StopPointItem key={index}
                     info={item}
                     refreshData={refreshData}
                  />
            )
         })
         setStopPointList(auxStopPointList);
         setCoordList(points);
      }
 },[stopPoints]);

 function refreshData(){
   setToggle(prev => !prev);
 }

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
                           empresa:userContext.userData.empresa};
         callWS("GET",params,error)
         .then(data =>   { 
               setError("");
               setStopPoints(data);
               setToggle(prev => !prev);
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
                  <div className="col-5 col-offset-1 hidden my-auto mx-auto lg:flex lg:flex-column">
                     <PagesTopBar
                        left={true}
                        logOut={userContext.logOut}
                     />
                     {Array.isArray(coordList) && coordList.length!==0 &&
                     (
                        <MyMapContainer 
                           markerList = {coordList}
                           basePoint = {basePointInfo} 
                           loadPoint = {loadPointInfo}/>
                     )}
                  </div>
                  <div className="col-12 lg:col-6 flex flex-column bg-orange-100 flex align-content-center justify-content-top h-screen overflow-hidden">
                     <PagesTopBar   
                        right={true}
                        showBack={true}
                        logOut={userContext.logOut}
                     />
                     <div className="card surface-50 shadow-5 lg:h-auto sm:h-screen px-3 py-5 lg:mx-5 text-left overflow-auto">
                        {stopPoints[0] && (
                           <PagesHeader
                              infoUser={userContext.userData}
                              infoResource={resourceContext.resourceData}
                           />
                        )}
                        <p className="text-3xl text-red-500">{error}</p>
                        <span className='p-3 text-left'>Viaje: {numViaje}</span>
                        {loadPointInfo && (
                           <div className='stopPointList'>
                              <LoadPointItem 
                                 info={loadPointInfo}
                                 refreshData={refreshData}
                                 infoResource={resourceContext.resourceData}/>
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