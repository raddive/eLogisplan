import React from "react";
import { Password } from 'primereact/password';
import '../css/components/Login.css';

export default function Login () 
{ 

    function loginClick () {
        console.log("Login click");
    };

    return (
        <>
        <div className="card shadow-5 px-3 py-5 lg:mx-5">
            <h1 className="text-center">Control de servicios</h1>
            <div className="field">
                <label htmlFor="firstname1">Usuario:</label>
                <input id="firstname1" type="text" className="evo-input text-base text-color surface-overlay p-2 appearance-none outline-none focus:border-primary w-full" />
            </div>
            <div className="field">
                <label htmlFor="lastname1">Contraseña: </label>
                <Password id="lastname1" toggleMask className="evo-password w-full" />
            </div>
            <button type="button" onClick={loginClick}
                    className="col-offset-6 col-6 text-white text-5xl bg-primary-500 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                    transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 
                    active:bg-primary-700 active:border-primary-700">LOGIN</button>
        </div>
        </>
    );
};