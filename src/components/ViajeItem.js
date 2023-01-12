import React, {useState,useEffect} from 'react';
import {Navigate,Link } from "react-router-dom";
import { Image } from 'primereact/image';
import { HHMM_to_String } from './utils';

import img_trip from "../images/img_trip.png"
import img_start from "../images/img_trip_start.png"
import img_end from "../images/img_trip_end.png"

export default function ViajeItem (props) { 

    const [tripImg,setTripImage] = useState();
    const [viajeStyle,setViajeStyle] = useState("grid stopPointList m-3 p-2");
    const [estadoStyle,setEstadoStyle] = useState("col-3 text-left text-base");

    useEffect(() => {
        calculaEstilos();
    }, []);

    function calculaEstilos()
    {
        setTripImage(img_trip);

        if(props.infoViaje.Estado==='Cargado text-xl')
        {
            setEstadoStyle(prev => prev +" p-2 text-orange-500");
        }
        else if(props.infoViaje.Estado==='Finalizado')
        {
            setTripImage(img_end);
            setEstadoStyle(prev => prev + ' text-green-500 text-2xl');
            setViajeStyle(prev => prev + ' bg-green-100');
        }
        else if(props.infoViaje.Estado==='Por empezar')
        {
            setTripImage(img_start);
            setEstadoStyle(prev => prev + ' text-gray-500');
            setViajeStyle(prev => prev + ' bg-gray-100');
        }
    }

 return (
    <Link to="/viaje" state={{ from: "plan", numViaje: props.infoViaje.Viaje}} className='linkNone'>
        <div className={viajeStyle}>
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
            <div className={estadoStyle}> 
                {props.infoViaje.Estado}
            </div>
        </div>
    </Link>
);};