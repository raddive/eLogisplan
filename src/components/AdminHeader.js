import React from "react";
import { Link} from 'react-router-dom'
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

import '../css/components/Header.css';

import img_customer from "../images/logoCustomer.png"
import img_eLogisplan from "../images/logoeLogisplan.png"
import img_evolution from "../images/logoEvolution.png"

import AdminMenu from "../pages/Administracion/AdminMenu";

import { UserDataConsumer, UserContext } from "contexts/userData";


export default function AdminHeader (props) 
{ 
    const userContext = React.useContext(UserContext);

    function handlerLogOut()
    {
        console.log("logout");
        props.logOut();
    }

    return (
        <UserDataConsumer>
            {context => 
                <div className="col-12 px-3 ">
                    <div className="col flex align-items-start">
                        <div className="col flex justify-content-start">
                            <Image className="" src={img_customer} alt="LogoLogisplan" width="100"/>                
                        </div>
                        <div className="col flex justify-content-end">
                            <Button onClick={handlerLogOut} className="text-white bg-orange-400" label="Salir" icon="pi pi-power-off"/>
                        </div>
                    </div>
                    <AdminMenu/>
                </div>        
            }
        </UserDataConsumer>
    );
};


