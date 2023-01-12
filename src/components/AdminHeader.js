import React from "react";
import { Link} from 'react-router-dom'

import '../css/components/Header.css';
import { Image } from 'primereact/image';

import img_customer from "../images/logoCustomer.png"
import img_eLogisplan from "../images/logoeLogisplan.png"
import img_evolution from "../images/logoEvolution.png"
import AdminMenu from "../pages/AdminMenu";


export default function AdminHeader (props) 
{ 
    function handlerClick()
    {
        console.log("logout");
        props.logOut();
    }

    return (
        <>
        <div className="grid">
            <div className="col-8 text-left p-5"> 
                <Image className="" src={img_customer} alt="LogoLogisplan" width="200"/>
            </div>
            <div className="col-4 flex flex-wrap justify-content-end align-content-center p-5"> 
                <div className="">
                    <Image className="col-6 text-right" imageClassName="evo-nav--logo-small" src={img_evolution} alt="LogoEvolution" />
                    <Image className="col-6 text-left" imageClassName="evo-nav--logo-small" src={img_eLogisplan} alt="LogoLogisplan" />
                </div>
            </div>
        </div>
        <AdminMenu 
            logOut={props.logOut}/>
    </>
    );
};