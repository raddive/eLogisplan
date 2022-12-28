import React from "react";
import { Image } from 'primereact/image';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default function NoPage () { 
    return (
        <div className="flex flex-column mt-8">
            <Image src="./images/logoLogisplan.png" alt="LogoLogisplan" />
            <p className="text-6xl">404 - No page found</p>
        </div>
    );
};