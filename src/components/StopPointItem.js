import React from 'react';
import { Link } from 'react-router-dom'
import { Image } from 'primereact/image';
import { HHMM_to_String } from './utils';

import img_progress from "../images/img_progress.png"
import img_bt_uncheck from "../images/img_bt_uncheck.png"
import img_bt_info from "../images/img_bt_info.png"
import img_bt_warning from "../images/img_bt_warning.png"
import img_bt_map from "../images/img_bt_map.png"


export default function StopPointItem (props) { 
 return (
     <div className='grid m-0'>
            <div className="col-1 text-left py-0"> 
                <div className="bg-cover bg-center" style={{backgroundImage: `url(${img_progress})`, height:"100%"}}>
                    <br/>
                    <Image className='check_uncheck' src={img_bt_uncheck} alt="LogoEvolution" />
                </div>
            </div>
            <div className="grid col-11 text-left"> 
                        <span className="col-4 text-left"> 
                            <span className='text-left text-base'>
                                {HHMM_to_String(props.info.HoraDestino)} - {HHMM_to_String(props.info.HoraDestinoSalida)}
                            </span>
                        </span>
                        <div className="col-8 text-left"> 
                        <Link to="/servicio" state={{ from: "viaje",numServicio:props.info.CodigoServicio,numParticion:props.info.ParticionPedido}} className='linkNone'>
                            <span className='text-left'>
                                {props.info.CodigoDestino}<br/>
                                <span className='text-base'>{props.info.CPDestino},{props.info.CiudadDestino}</span>

                            </span>
                        </Link>
                        </div>
                <div className="col-12 text-right stopPointContent"> 
                    <Link to="/servicio"state={{ from: "viaje",numServicio:props.info.CodigoServicio,numParticion:props.info.ParticionPedido}}><Image className='stopPoint_bt' src={img_bt_info} alt="InfoButton" /></Link>
                    <Link to="/warning" state={{ from: "viaje",numServicio:props.info.CodigoServicio,numParticion:props.info.ParticionPedido}}><Image className='stopPoint_bt' src={img_bt_warning} alt="WarningButton" /></Link>
                    <a href={"https://maps.google.com/?q="+props.info.Descarga_Coord_Latitude+","+props.info.Descarga_Coord_Longitude} target="_blank"><Image className='stopPoint_bt' src={img_bt_map} alt="MapButton" /></a>
                    
                </div>
            </div>

        </div>
);};