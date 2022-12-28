import React, {useState} from 'react';
import {Navigate,Link } from "react-router-dom";
import { Image } from 'primereact/image';
import { HHMM_to_String } from './utils';

import img_trip from "../images/img_trip.png"
import img_start from "../images/img_trip_start.png"
import img_end from "../images/img_trip_end.png"

export default function ViajeItem (props) { 

    let img = img_trip;
    if(props.infoViaje.Estado==="Por empezar")
        img=img_start;
    else if(props.infoViaje.Estado==="Finalizado")
        img=img_end;
    const [tripImg,setTripImage] = useState(img);


    function handlerClick()
    {
        
    }

 return (
    <Link to="/viaje" state={{ from: "plan", numViaje: props.infoViaje.Viaje}} className='linkNone'>

    <div className='grid stopPointList m-3 p-2'>
        <div className="col-3 text-left"> 
            <Image imageClassName="evo-nav--logo-small" src={tripImg} alt="LogoEvolution" />
        </div>
        <div className="col-6 text-left"> 
            <span className='text-2xl text-left'>
                Viaje: {props.infoViaje.Viaje}
                <br></br>
                <span className='text-left'>{HHMM_to_String(props.infoViaje.HoraInicioViaje)} - {HHMM_to_String(props.infoViaje.HoraFinViaje)}</span>
            </span>
        </div>
        <div className="col-3 text-left text-base"> 
            {props.infoViaje.Estado}
        </div>
  </div>
    </Link>
);};