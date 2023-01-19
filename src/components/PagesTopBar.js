import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import img_logoEvolution from "../images/logoEvolution.png"
import img_logoLogisplan from "../images/logoLogisplan.png"
import img_customer from "../images/logoCustomer.png"


export default function PagesTopBar (props) { 

    const navigate = useNavigate();

    function handlerLogOut()
    {
        props.logOut();
    }
    function handlerBack()
    {
        navigate(-1);
    }

    return (
        <div className="flex align-items-start">
            {props.left && (<div className="col flex">
                    <div className="col flex justify-content-start">
                        <Image className="" imageClassName="evo-nav--logo-small" src={img_logoEvolution} alt="LogoEvolution" />
                        <Image className="" imageClassName="evo-nav--logo-small" src={img_logoLogisplan} alt="LogoLogisplan" />
                    </div>
                    <div className="col">
                        <Image className="flex justify-content-end ml-5" src={img_customer} width="200px" alt="CustomerLogo"/>
                    </div>
                </div>
            )}
            {props.right && (<div className="col flex">
                    <div className="col flex justify-content-start">
                        {props.showBack && <Button onClick={handlerBack} className="text-white bg-orange-400" icon="pi pi-backward"/>}
                    </div>
                    <div className="col flex justify-content-end">
                        <Button onClick={handlerLogOut} className="text-white bg-orange-400" label="Salir" icon="pi pi-power-off"/>
                    </div>
                </div>

            )}
        </div>
    );
};