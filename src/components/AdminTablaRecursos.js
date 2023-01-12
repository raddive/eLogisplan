import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import img_trip from "../images/img_truck.png"
import img_error_time from "../images/img_error_time.png"
import img_warning from "../images/img_bt_warning.png"

export default function AdminTablaRecursos (props) { 

    let img = img_trip;
    const [tripImg,setTripImage] = useState(img);
    const [selectedResource,setSelectedResource] = useState();

    const [trips, setTrips] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        setTrips(props.data)
    }, [props]);

    useEffect(() => {
        if(selectedResource)
        {
            props.selRecurso({codConductor:selectedResource.CodigoConductor,codTractora:selectedResource.CodigoTractora,codCisterna:selectedResource.CodigoCisterna})
        } 
    }, [selectedResource]);



    const vehicleTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.CodigoConductor} src={tripImg} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="80" style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.CodigoConductor}</span>
            </React.Fragment>
        );
    }
    const trabajoTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.TiempoTrabajo_Pintar}</span> {rowData.TiempoExtraTrabajo_Pintar && (<span className='text-red-500'>({rowData.TiempoExtraTrabajo_Pintar})</span>)}         
            </React.Fragment>
        );
    }
    const conduccionTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.TiempoConduccion_Pintar}</span> {rowData.TiempoExtraConduccion_Pintar && (<span className='text-red-500'>({rowData.TiempoExtraConduccion_Pintar})</span>)}         
            </React.Fragment>
        );
    }
    const retrasoTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.TiempoRetraso_Pintar && (<span className='text-red-500'>{rowData.TiempoRetraso_Pintar}</span>)}         
            </React.Fragment>
        );
    }

    const statusTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.TiempoRetraso_Pintar && (<img alt="retraso" src={img_error_time} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="50" style={{ verticalAlign: 'middle' }}/>)}
                {rowData.Incidencias && (<img alt="warning" src={img_warning} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="50" style={{ verticalAlign: 'middle' }} />)}
            </React.Fragment>
        );
    }


    return (

        <>
            <Toast ref={toast}></Toast>

            <div className="card">
                <h5>Planificación {props.date}</h5>
                {/* <DataTable value={trips} rowGroupMode="subheader" groupRowsBy="CodigoConductor"
                    sortMode="single" sortField="CodigoConductor" sortOrder={1} scrollable scrollHeight="400px"
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate} responsiveLayout="scroll"> */}
                <DataTable value={trips} responsiveLayout="scroll" size="large" className='text-xl'
                    selectionMode="single" selection={selectedResource} onSelectionChange={e => setSelectedResource(e.value)}>
                    <Column body={vehicleTemplate} header="Conductor"  className="col-2"></Column>
                    <Column field="CodigoTractora" header="Vehículo" className="col-2"></Column>
                    <Column body={trabajoTemplate} header="T. Trabajo"  className="col-2"></Column>
                    <Column body={conduccionTemplate} header="T. Conducción"  className="col-2"></Column>
                    <Column body={retrasoTemplate} header="Retraso" className="col-2"></Column>
                    <Column body={statusTemplate} header="Estado"  className="col-2"></Column>
                </DataTable>
            </div>
        </>


            // <div className='flex border'>
            //     <div className="col-3 text-left "> 
            //         {props.infoRecurso.CodigoTractora} - {props.infoRecurso.CodigoCisterna}
            //         <br/>{props.infoRecurso.CodigoConductor}
            //         <Link to="/AdminPlanRecurso" state={{ from: "plan",}} className='linkNone'>
            //             <br></br><Image imageClassName="evo-nav--logo-small" src={tripImg} alt="" />
            //         </Link>
            //     </div>
            //     <div className="col-3 text-left"> 
            //         {props.infoRecurso.TiempoTrabajo_Pintar}
            //         <br/>{props.infoRecurso.TiempoExtraTrabajo_Pintar}
            //     </div>
            //     <div className="col-3 text-left"> 
            //         {props.infoRecurso.TiempoConduccion_Pintar}
            //         <br/>{props.infoRecurso.TiempoExtraConduccion_Pintar}
            //     </div>
            //     <div className="col-3 text-left"> 
            //         {props.infoRecurso.TiempoRetraso_Pintar}
            //     </div>
            //     <div className="col-6 text-left"> 
            //     </div>
            //     <div > 
                    
            //     </div>
            // </div>
    );
};