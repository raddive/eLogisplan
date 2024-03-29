import React from "react";
import '../css/components/Header.css';
import { Image } from 'primereact/image';

import img_customer from "../images/logoCustomer.png"
import img_eLogisplan from "../images/logoeLogisplan.png"
import img_evolution from "../images/logoEvolution.png"

export default function Header () 
{ 
    return (
        <div className="grid">
            <div className="col-8 text-left"> 
                <Image className="" src={img_customer} alt="LogoLogisplan" width="200px"/>
            </div>
            <div className="col-4"> 
                <div className="grid">
                    <Image className="col-6 text-right" imageClassName="evo-nav--logo-small" src={img_evolution} alt="LogoEvolution" />
                    <Image className="col-6 text-left" imageClassName="evo-nav--logo-small" src={img_eLogisplan} alt="LogoLogisplan" />
                </div>
            </div>
        </div>
    );
};