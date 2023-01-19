import React, { useEffect, useState } from "react";
import { Image } from 'primereact/image';
import {Navigate, useResolvedPath } from "react-router-dom";
import Moment from 'moment';

import { Password } from 'primereact/password';

import '../css/pages/Login.css';

import img_LogoeLogisplan from "../images/logoeLogisplan.png";
import img_LightDark_Light from "../images/img_bt_light_dark.png";
import img_LightDark_Dark from "../images/img_bt_light_dark_white.png";

import { UserDataConsumer, UserContext } from "../contexts/userData";
import { callWS,updateBBDD } from "../components/utils";

export default function Login (props) 
{ 

    const userContext = React.useContext(UserContext);

    const [formData,setFormData] = useState({user:"",password:""});
    const [error,setError] = useState("");
    const [redirect,setRedirect] = useState(false);
    const [bDark,setbDark] = useState();
    const [switchImg,setSwitchImg] = useState();

    useEffect(() => {
        setbDark(JSON.parse(localStorage.getItem("eLogisplan-DarkMode")));
     }, [])

    useEffect(() => {
        changeTheme();
     }, [bDark,localStorage.getItem("eLogisplan-DarkMode")])

    function handleChange(event) { 
            const {name,value} = event.target;
            setFormData( prevFormData => 
            {
                return {
                    ...prevFormData,
                    [name] : value   
                }
            });
        };
    
//LOGICA    

function loginClick () {

    if(!updateBBDD(error))
        setError(error);

    if(formData.user && formData.password)
    {
        const params = { rquest:"loginJWT",user:formData.user,empresa:process.env.REACT_APP_EMPRESA};
        callWS("GET",params,error)
        .then(data =>   { 
            if(userContext.checkJWTLogin(data,formData.password))
            {
                setError("");
                const formatDate = Moment().format('DD-MM-YYYY')
                userContext.setUser(data,formatDate);
                updateBBDD();
                setRedirect(true);
                return;
            }
            else
                throw new Error("Usuario / contraseña incorrectos");
        })
        .catch((error) => {
           setError(error.message);
        });
    }    
};

//RENDER
 
    function renderRedirect() {
        if (redirect) {
            return <Navigate to='/plan' />
        }
    }

    function onChangeTheme(){
        setbDark(prev => !prev);
    }
    function changeTheme(){
        if(bDark===true || bDark===false)  
        {
            localStorage.setItem("eLogisplan-DarkMode", bDark);
            let themeLink = document.getElementById('theme-link');
            if (themeLink) {
                if(bDark===false)
                {
                    themeLink.href = "themes/orange-light.css";
                    setSwitchImg(img_LightDark_Light)
                }
                else
                {
                    themeLink.href = "themes/orange-dark.css";
                    setSwitchImg(img_LightDark_Dark)
                }
            }
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
                    <h3 className="text-center">Control de servicios</h3>
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