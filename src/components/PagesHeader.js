import React from 'react';
import { Image } from 'primereact/image';
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
                <Image className="col-6" imageClassName="evo-nav--logo-small" src="./images/logoEvolution.png" alt="LogoEvolution" />
                <Image className="col-6 text-left" imageClassName="evo-nav--logo-small" src="./images/logoLogisplan.png" alt="LogoLogisplan" />
            </div>
        </div>
        <div className="col-8 text-right"> 
            <span className='underline text-orange-500' onClick={handlerClick}>Salir</span>
        </div>
        {props.infoUser && (
            <>
                <span className='col-12 text-right'>{props.infoUser.date}</span>
                <div className='text-left border-solid m-3 p-2 w-full'>

                    <span className='text-2xl text-left'>
                        {props.infoUser.name} ({props.infoUser.code})
                        <br></br>
                        <span className='text-left'>Inicio - Fin : {HHMM_to_String(props.inicio)} - {HHMM_to_String(props.fin)}</span>
                    </span>
                </div>
            </>
        )}
    </div>
);};