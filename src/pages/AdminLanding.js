import React from "react";
import { Image } from 'primereact/image';
import img_Landing from "../images/img_Landing.png"


import Header from "../components/Header";
import AdminLogin from "./AdminLogin";

export default function AdminLanding () 
{ 
    return (
        <div className="grid max-w-screen ml-0">
            <div className="col-5 col-offset-1 hidden max-h-screen lg:flex">
                <Image className="flex align-content-start justify-content-center flex-wrap p-5" imageStyle={{width:"100%", height:"auto"}} src={img_Landing} alt="CityNight" />
            </div>
            <div className="col-11 col-offset-1 m-5 lg:col-5 lg:col-offset-0">
                <Header />
                <AdminLogin />
            </div>
        </div>
    );
};