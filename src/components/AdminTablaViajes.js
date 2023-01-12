import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { HHMM_to_String } from './utils';

import img_trip from "../images/img_trip.png"
import img_start from "../images/img_trip_start.png"
import img_end from "../images/img_trip_end.png"
import img_truck from "../images/img_truck.png"
import img_error_time from "../images/img_error_time.png"
import img_warning from "../images/img_bt_warning.png"
import img_bt_uncheck from "../images/img_bt_uncheck.png"
import img_bt_check from "../images/img_bt_check.png"
import img_bt_info from "../images/img_bt_info.png"
import img_bt_map from "../images/img_bt_map.png"

export default function AdminTablaViajes (props) { 

    const [truckImg,setTruckImage] = useState(img_truck);
    const [tripImg,setTripImage] = useState(img_trip);
    const [expandedRows, setExpandedRows] = useState([]);
    const [trips, setTrips] = useState([]);
    const toast = useRef(null);
    const [selResource, setSelResource] = useState({conductor:"",tractora:""});

    useEffect(() => {
        setTrips(props.data)
        if(props.data[0]){
            setSelResource({conductor:props.data[0].CodigoConductor,tractora:props.data[0].CodigoTractora});
        }
    }, [props]);


    const headerTemplate = (rowData) => {
        let checkImg=img_trip;
        let myBg="bg-white";
        if(rowData.Estado==="Finalizado"){
            checkImg=img_end;    
            myBg="bg-green-100";
        }
        else if(rowData.Estado==="En curso..."){
            checkImg=img_start;
        }
        else if(rowData.Estado==="Por empezar"){
            checkImg=img_start;
            myBg="bg-gray-100";        }

        return (
            <React.Fragment>
                <div className={`flex col-12 ${myBg}`}>
                    <img alt={rowData.estado} src={checkImg} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="80" style={{ verticalAlign: 'middle' }} />
                    <span>Viaje: {rowData.Viaje} {HHMM_to_String(rowData.HoraInicioViaje)} - {HHMM_to_String(rowData.HoraFinViaje)}
                    <br/>Carga: {HHMM_to_String(rowData.HoraCarga)} - {HHMM_to_String(rowData.HoraCargaSalida)} {rowData.HoraRealCarga!=="" && 
                        (<span>
                            <img alt={rowData.HoraRealDestino} src={img_bt_check} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="30" style={{ verticalAlign: 'middle' }} />
                                {HHMM_to_String(rowData.HoraRealCarga)}</span>)}</span>
                </div>
            </React.Fragment>

        );
    }
    const footerTemplate = (rowData) => {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
    
    const checkTemplate = (rowData) => {
        const checkImg=rowData.HoraRealDestino!==""?img_bt_check:img_bt_uncheck
        const textColor=(rowData && rowData.HoraDestinoSalida<rowData.HoraRealDestino)?"text-red-500 text-xl":"text-green-700 text-xl";

        return (
            <React.Fragment>
                <img alt={rowData.HoraRealDestino} src={checkImg} onClick={(rowData) => onInfoServicio(rowData)} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="50" style={{ verticalAlign: 'middle' }} />
                {rowData.HoraRealDestino!=="" && (<span className={textColor}>{HHMM_to_String(rowData.HoraRealDestino)}</span>)}
            </React.Fragment>
        );
    }
    const timeTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span >{HHMM_to_String(rowData.HoraDestino)} - {HHMM_to_String(rowData.HoraDestinoSalida)}</span>
            </React.Fragment>
        );
    }
    const customerTemplate = (rowData) => {
        const sAux=rowData.Observaciones2.replace(/\r\n/g, "<br />");
        return (
            <React.Fragment>
                <span onClick={onInfoServicio}>{rowData.CodigoDestino}<br></br><span className='text-base'>{rowData.CPDestino},{rowData.CiudadDestino}</span></span> 
                {rowData.Observaciones2!=="" && (<><span><br/></span><span className='text-red-500 text-base' dangerouslySetInnerHTML={{__html: sAux}}></span></>)}         
            </React.Fragment>
        );
    }
    const productsTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className='text-base'>{rowData.Cantidad1Total} kgs. {rowData.Cantidad2Total} lts.</span>
            </React.Fragment>
        );
    }
    const statusTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.Observaciones2 && (<img alt="warning" src={img_warning} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="50" style={{ verticalAlign: 'middle' }} />)}
            </React.Fragment>
        );
    }

    const onRowGroupExpand = (event) => {
        
        // toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.Viaje, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        // toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.Viaje, life: 3000 });
    }

    function onInfoServicio(data)
    {
        props.selServicio({codPedido:data.CodigoServicio, particion:data.ParticionPedido});
    }

    return (

        <>
            <Toast ref={toast}></Toast>

            <div className="card">
                <h5>{selResource.conductor} {selResource.tractora} {props.date}</h5>

                <DataTable value={trips} rowGroupMode="subheader" groupRowsBy="Viaje" className='text-xl'
                    sortMode="single" sortField="Viaje" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column body={checkTemplate} header=""  className="col-1"></Column>
                    <Column body={timeTemplate} header="" className="col-3 text-base"></Column>
                    <Column body={customerTemplate} header=""  className="col-4"></Column>
                    <Column body={productsTemplate} header=""  className="col-3"></Column>
                    <Column body={statusTemplate} header=""  className="col-1"></Column>
                    {/*<Column body={conduccionTemplate} header="T. Conducción"  className="col-2"></Column>
                    <Column body={retrasoTemplate} header="Retraso" className="col-2"></Column>
                    <Column body={statusTemplate} header="Estado"  className="col-2"></Column> */}
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