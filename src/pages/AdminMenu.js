import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AdminMenu (props) { 

    function handlerClick()
    {
        console.log("logout");
        props.logOut();
    }

    const items = [
        {label: 'Planning', icon: 'pi pi-fw pi-truck'},
        {label: 'Calendario', icon: 'pi pi-fw pi-calendar'},
        {label: 'Usuarios', icon: 'pi pi-fw pi-calendar'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    return (
        <Menubar model={items} className="ml-3 mr-3 col-12" 
            end={<Button onClick={handlerClick} label="Salir" icon="pi pi-power-off"/>} 
        />    
    );}
;