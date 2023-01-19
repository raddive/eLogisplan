import React from "react";
import { Image } from 'primereact/image';

import Login from "../pages/Login";
import PagesTopBar from '../components/PagesTopBar';

import img_customer from "../images/logoCustomer.png"
import img_LogoeLogisplan from "../images/logoeLogisplan.png"

export default function Landing () 
{ 
    return (
        <div className="grid max-w-screen h-screen  ml-0 ">
            <div className="col-6 hidden my-auto lg:flex lg:flex-column">
                <PagesTopBar
                        left={true}
                />
                <Image className="" src={img_LogoeLogisplan} imageStyle={{width:"60%", height:"auto"}}  alt="eLogisplanLogo" />
            </div>
            <div className="col-12 lg:col-6 flex flex-column bg-orange-100 flex align-content-center justify-content-top lg:justify-content-center">
                    <Login />
            </div>
        </div>
    );
};