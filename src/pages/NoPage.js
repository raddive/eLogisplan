import React from "react";
import { Image } from 'primereact/image';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import img_eLogisplan from "../images/logoeLogisplan.png"


export default function NoPage () { 
    return (
        <div className="flex flex-column mt-8">
            <Image src={img_eLogisplan} alt="LogoeLogisplan" height="500px" />
            <p className="text-6xl">404 - No page found</p>
        </div>
    );
};