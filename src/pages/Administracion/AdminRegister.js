import React, { useState } from "react";
import {Navigate } from "react-router-dom";
import Moment from 'moment';

import { Password } from 'primereact/password';

import '../css/pages/Login.css';

import { UserDataConsumer, UserContext } from "../../contexts/userData";
import { callWS,updateBBDD } from "../../components/utils";

export default function Login (props) 
{ 

    const userContext = React.useContext(UserContext);

    const [formData,setFormData] = useState({user:"",password:""});
    const [error,setError] = useState("");
    const [redirect,setRedirect] = useState(false);

    function handleChange(event) { 
            // console.log("cambio");
            const {name,value} = event.target;
            // console.log(name,value);
            setFormData( prevFormData => 
            {
                return {
                    ...prevFormData,
                    [name] : value   
                }
            });
        };
    
//LOGICA    

function registerClick () {

    if(formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword )
    {
        setError("Contraseñas no coinciden");
        return;
    }

    if(formData.code && formData.name  && formData.password && formData.confirmPassword)
    {
        //Miro si el usuario ya existe
        let error="";
        const params = { rquest:"loginJWT",user:formData.code,empresa:process.env.REACT_APP_EMPRESA};
        callWS("GET",params,error)
        .then(data =>   { 
            if(data)
            {
                console.log(data);
                console.log("Usuario ya existe");
                setError("Usuario ya existe");                
                return ;
            }
        })
        .catch((error) => {
            if(error==="NO DATA")
            {
                const hash=userContext.registerJWTUser(formData);
                const params = { rquest:"createUser",body:{code:formData.code,name:formData.name,password:hash,empresa:process.env.REACT_APP_EMPRESA}};
                callWS("POST",params,error)
                .then(data =>   { 
                    {
                        setError("Usuario creado");
                        return;
                    }
                })
                .catch((error) => {
                setError(error.message);
                });
            }
            else
            {
                console.log(error);
                return ;
            }
         });
    }
};

//RENDER
 
    return (
        <UserDataConsumer>
            {context => 
                <div className="card shadow-5 px-3 py-5 lg:mx-5 bg-gray-50">
                    <h1 className="text-center">Registro de usuarios</h1>
                    <div className="field">
                        <label htmlFor="code">Código:</label>
                        <input id="code" name="code" type="text" onChange={handleChange} className="evo-input surface-overlay p-2 appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Nombre:</label>
                        <input id="name" name="name" type="text" onChange={handleChange} className="evo-input surface-overlay p-2 appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Contraseña: </label>
                        <Password id="password" name="password" toggleMask onChange={handleChange} className="evo-password w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="confirmPassword">Repite contraseña: </label>
                        <Password id="confirmPassword" name="confirmPassword" toggleMask onChange={handleChange} className="evo-password w-full" />
                    </div>
                    <button type="button" onClick={registerClick}
                            className="col-offset-6 col-6 text-white text-5xl bg-primary-500 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                            transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 
                            active:bg-primary-700 active:border-primary-700">REGISTRO</button>
                    <p className="text-3xl text-red-500">{error}</p>        
                </div>
            }
        </UserDataConsumer>
    );
};