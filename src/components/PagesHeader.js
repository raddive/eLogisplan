import React from 'react';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import img_logoEvolution from "../images/logoEvolution.png"
import img_logoLogisplan from "../images/logoLogisplan.png"

import { HHMM_to_String } from './utils';


export default function PagesHeader (props) { 

    function handlerClick()
    {
        props.logOut();
    }

    return (
    <div className="grid m-0">
        <div className="col-4 text-left"> 
            <div className="grid">
                <Image className="col-6" imageClassName="evo-nav--logo-small" src={img_logoEvolution} alt="LogoEvolution" />
                <Image className="col-6 text-left" imageClassName="evo-nav--logo-small" src={img_logoLogisplan} alt="LogoLogisplan" />
            </div>
        </div>
        <div className="col-8 text-right"> 
            <Button onClick={handlerClick} label="Salir" icon="pi pi-power-off"/>
            {/* <span className='underline text-orange-500' onClick={handlerClick}>Salir</span> */}
        </div>
        {props.infoUser && props.infoResource && (
            <>
                <span className='col-12 text-right'>{props.infoUser.date}</span>
                <div className='text-left border-solid m-3 p-2 w-full'>

                    <span className='text-2xl text-left'>
                        {props.infoUser.name} ({props.infoUser.code})
                        <br></br>
                        <span className='text-left'>Inicio - Fin : {HHMM_to_String(props.infoResource.horaInicio)} - {HHMM_to_String(props.infoResource.horaFin)}</span>
                    </span>
                </div>
            </>
        )}
    </div>
);};