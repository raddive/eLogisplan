import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Image } from 'primereact/image';
import { HHMM_to_String } from './utils';

import img_progress from "../images/img_progress.png"
import img_bt_uncheck from "../images/img_bt_uncheck.png"
import img_bt_info from "../images/img_bt_info.png"
import img_bt_warning from "../images/img_bt_warning.png"
import img_bt_map from "../images/img_bt_map.png"


export default function LoadPointItem (props) { 
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
                            {HHMM_to_String(props.info.HoraCarga)} - {HHMM_to_String(props.info.HoraCargaSalida)}                            
                            </span>
                        </span>
                        <div className="col-8 text-left"> 
                            <span className='text-left'>
                                {props.info.NombreCarga}<br/>
                                <span className='text-base'>{props.info.CPCarga},{props.info.CiudadCarga}</span>

                            </span>
                        </div>
                <div className="col-12 text-right stopPointContent"> 
                    {props.info.Carga_Coord_Latitude && props.info.Carga_Coord_Longitude && (
                        <a href={"https://maps.google.com/?q="+props.info.Carga_Coord_Latitude+","+props.info.Carga_Coord_Longitude} target="_blank"><Image className='stopPoint_bt' src={img_bt_map} alt="MapButton" /></a>
                    )}
                </div>
            </div>

        </div>
);};