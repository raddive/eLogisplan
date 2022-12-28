import React from "react";

import Header from "../components/Header";
import Login from "../pages/Login";

export default function Landing () 
{ 
    return (
        <div className="grid max-w-screen">
            <div className="col-7 hidden max-h-screen
                            lg:flex">
                <img className="w-full pl-5" src="./images/imgLandingLeft.png" alt="CityNight" />
            </div>
            <div className="col-10 col-offset-1 
                            lg:col-5 lg:col-offset-0">
                <Header />
                <Login />
            </div>
        </div>
    );
};