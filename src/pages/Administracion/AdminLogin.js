import React, { useState,useEffect } from "react";
import {Navigate } from "react-router-dom";
import Moment from 'moment';
import { Image } from 'primereact/image';
import { Password } from 'primereact/password';

import 'css/pages/Login.css';

import img_LogoeLogisplan from "images/logoeLogisplan.png";
import img_LightDark_Light from "images/img_bt_light_dark.png";
import img_LightDark_Dark from "images/img_bt_light_dark_white.png";

import { UserDataConsumer, UserContext } from "contexts/userData";
import { callWS,updateBBDD,changeTheme } from "components/utils";

export default function AdminLogin (props) 
{ 

    const userContext = React.useContext(UserContext);

    const [formData,setFormData] = useState({user:"",password:""});
    const [error,setError] = useState("");
    const [bDark,setbDark] = useState();
    const [switchImg,setSwitchImg] = useState();
    const [redirect,setRedirect] = useState(false);
    const formatDate = Moment().format('DD-MM-YYYY')


    useEffect(() => {
        setbDark(JSON.parse(localStorage.getItem("eLogisplan-DarkMode")));
     }, [])

    useEffect(() => {
        changeTheme(bDark);
        setSwitchImg(bDark?img_LightDark_Dark:img_LightDark_Light);

        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [bDark,localStorage.getItem("eLogisplan-DarkMode")])

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

function onChangeTheme(){
    setbDark(prev => !prev);
}

function loginClick () {

    if(!updateBBDD(error))
        setError(error);

    //userContext.registerJWTUser(formData);

    if(formData.user && formData.password)
    {
        const params = { rquest:"loginJWT",user:formData.user,empresa:process.env.REACT_APP_EMPRESA};
        callWS("GET",params,error)
        .then(data =>   { 
            if(data.rol!=="1")
            {
                throw new Error("Usuario sin privilegios");
            }
            else
            {
                if(userContext.checkJWTLogin(data,formData.password))
                {
                    setError("");
                    const formatDate = Moment().format('DD-MM-YYYY')
                    userContext.setAdmin(formData.user);
                    setRedirect(true);
                    return;
                }
                else
                    throw new Error("Usuario / contraseña incorrectos");
            }
        })
        .catch((error) => {
           setError(error.message);
        });
    }    
};

//RENDER
 
    function renderRedirect() {
        if (redirect) {
            return <Navigate to='/adminPlan' />
        }
    }

    return (
        <UserDataConsumer>
            {context => 
                <div className="card surface-50 shadow-5 lg:h-auto sm:h-screen px-3 py-5 lg:mx-5 ">
                    {renderRedirect()}
                    <Image onClick={onChangeTheme}  className="flex lg:hidden lg:justify-content-end justify-content-start" src={switchImg} imageStyle={{width:"30px", height:"auto"}}  alt="LightDark" />
                    <Image className="lg:hidden flex justify-content-end" src={img_LogoeLogisplan} imageStyle={{width:"30%", height:"auto"}}  alt="eLogisplanLogo" />
                    <h2 className="text-center text-orange-400">eLOGISPLAN</h2>
                    <h3 className="text-center">Panel de control - Administración</h3>
                    <div className="field">
                        <label htmlFor="date">Fecha:</label>
                        <input id="date" name="date" type="text" value={formatDate} onChange={handleChange} className="evo-input surface-overlay p-2 appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="user">Usuario:</label>
                        <input id="user" name="user" type="text" onChange={handleChange} className="evo-input surface-overlay p-2 appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Contraseña: </label>
                        <Password id="password" name="password" toggleMask onChange={handleChange} className="evo-password w-full" />
                    </div>
                    <button type="button" onClick={loginClick}
                            className="col-offset-6 col-6 text-white text-5xl bg-orange-400 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                            transition-all transition-duration-200 hover:bg-orange-500 hover:border-primary-600 
                            active:bg-primary-700 active:border-primary-700">LOGIN</button>
                    <p className="text-3xl text-red-500">{error}</p>        
                </div>
            }
        </UserDataConsumer>
    );
};