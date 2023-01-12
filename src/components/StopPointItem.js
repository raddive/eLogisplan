import React, { useEffect, useState,useRef } from 'react';
import { Link, useActionData } from 'react-router-dom'
import { Image } from 'primereact/image';
import { HHMM_to_String,chechUncheckStopPoint } from './utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import img_progress from "../images/img_progress.png"
import img_bt_uncheck from "../images/img_bt_uncheck.png"
import img_bt_check from "../images/img_bt_check.png"
import img_bt_info from "../images/img_bt_info.png"
import img_bt_warning from "../images/img_bt_warning.png"
import img_bt_map from "../images/img_bt_map.png"




export default function StopPointItem (props) { 

    const [stopPointInfo,setStopPointInfo] = useState(props.info);
    const [checked,setChecked] = useState(false);
    const [checkedImage,setCheckedImage] = useState(img_bt_check);

    const toastBC = useRef(null);

    useEffect(() => {
        setStopPointInfo(props.info)
        setChecked(stopPointInfo.HoraRealDestino?true:false);
    },[]);
    
    useEffect(() => {
        setStopPointInfo(props.info)
    },[props]);

    useEffect(() => {
        props.refreshData();
        setCheckedImage(checked?img_bt_check:img_bt_uncheck);
    },[checked]);


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
        chechUncheckStopPoint(error, !checked, stopPointInfo.CodigoServicio,stopPointInfo.ParticionPedido)
        setChecked(prev=> !prev);
        clearToast();
    }


    const textColor=stopPointInfo.HoraDestinoSalida<stopPointInfo.HoraRealDestino?"text-red-500 text-xl":"text-green-700 text-xl";

 return (
     <div className='grid m-0'>
            <div className="col-1 text-left py-0"> 
                <div className="bg-cover bg-center" style={{backgroundImage: `url(${img_progress})`, height:"100%"}}>
                    <br/>
                    <Toast ref={toastBC} position="top-center" />
                    <Image onClick={showConfirm} className='check_uncheck' src={checkedImage} alt="LogoEvolution" />
                </div>
            </div>
            <div className="grid col-11 text-left"> 
                        <span className="col-4 text-left"> 
                            <span className='text-left text-base'>
                                {HHMM_to_String(stopPointInfo.HoraDestino)} - {HHMM_to_String(stopPointInfo.HoraDestinoSalida)}
                                {checked===true && stopPointInfo.HoraRealDestino!=="" && (<span className={textColor}><br/>{HHMM_to_String(stopPointInfo.HoraRealDestino)}</span>)}
                            </span>
                        </span>
                        <div className="col-8 text-left"> 
                        <Link to="/servicio" state={{ from: "viaje",numServicio:stopPointInfo.CodigoServicio,numParticion:stopPointInfo.ParticionPedido}} className='linkNone'>
                            <span className='text-left'>
                                {stopPointInfo.CodigoDestino}<br/>
                                <span className='text-base'>{stopPointInfo.CPDestino},{stopPointInfo.CiudadDestino}</span>
                
                            </span>
                        </Link>
                        </div>
                <div className="col-12 text-right stopPointContent"> 
                    <Link to="/servicio"state={{ from: "viaje",numServicio:stopPointInfo.CodigoServicio,numParticion:stopPointInfo.ParticionPedido}}><Image className='stopPoint_bt' src={img_bt_info} alt="InfoButton" /></Link>
                    <Link to="/warning" state={{ from: "viaje",numServicio:stopPointInfo.CodigoServicio,numParticion:stopPointInfo.ParticionPedido}}><Image className='stopPoint_bt' src={img_bt_warning} alt="WarningButton" /></Link>
                    <a href={"https://maps.google.com/?q="+stopPointInfo.Descarga_Coord_Latitude+","+stopPointInfo.Descarga_Coord_Longitude} target="_blank"><Image className='stopPoint_bt' src={img_bt_map} alt="MapButton" /></a>
                    
                </div>
            </div>

        </div>
);};