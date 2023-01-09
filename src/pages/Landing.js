import React from "react";
import { Image } from 'primereact/image';

import Header from "../components/Header";
import Login from "../pages/Login";

export default function Landing () 
{ 
    return (
        <div className="grid max-w-screen ml-0">
            <div className="col-5 col-offset-1 hidden max-h-screen lg:flex">
                <Image className="flex align-content-start justify-content-center flex-wrap p-5" imageStyle={{width:"100%", height:"auto"}} src="./images/imgLandingLeft.png" alt="CityNight" />
            </div>
            <div className="col-11 col-offset-1 m-5 lg:col-5 lg:col-offset-0">
                <Header />
                <Login />
            </div>
        </div>
    );
};