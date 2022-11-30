import React from "react";
import '../css/components/Header.css';
import { Image } from 'primereact/image';

export default function Header () 
{ 
    return (
        <div className="grid">
            <div className="col-8 text-left"> 
                <Image className="" src="./images/logoCustomer.png" alt="LogoLogisplan" />
            </div>
            <div className="col-4"> 
                <div className="grid">
                    <Image className="col-6 text-right" imageClassName="evo-nav--logo-small" src="./images/logoEvolution.png" alt="LogoEvolution" />
                    <Image className="col-6 text-left" imageClassName="evo-nav--logo-small" src="./images/logoLogisplan.png" alt="LogoLogisplan" />
                </div>
            </div>
        </div>
    );
};