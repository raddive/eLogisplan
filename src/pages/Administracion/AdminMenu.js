import React from 'react';
import {Link, Navigate } from "react-router-dom";

import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { UserDataConsumer,UserContext } from "contexts/userData";

export default function AdminMenu () { 
    const userContext = React.useContext(UserContext);

    function changeTab(event)
    {
        return <Navigate to="/adminMap"></Navigate>
    }

    const items = [
        {label: 'Planning', icon: 'pi pi-fw pi-truck'},
        {label: 'Mapa', icon: 'pi pi-fw pi-map',  command:(e)=>changeTab(e)},
        {label: 'Usuarios', icon: 'pi pi-fw pi-calendar',  url: '/adminMap2'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    return (
        <UserDataConsumer>
            {context => 
                <Menubar model={items} className="col max-w-screen m-0"/>    
            }
        </UserDataConsumer>
    );}
;