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
        // let _expandedRows = {};
        // trips.forEach((t,index) => _expandedRows[`${t.iaje}`] = true);
        // setExpandedRows(_expandedRows);
    }, [props]);


    const headerTemplate2 = (data) => {
        return (
            <React.Fragment >
                <div class="grid"style={{minWidth:"1000px"}}>
                    <div class="col-6">

                    </div>
                    <div class="col-6">En curso</div>
                </div>
            </React.Fragment>    
        )
    }

    const headerTemplate = (rowData) => {
        let checkImg=img_trip;
        let myBg="white";
        if(rowData.Estado==="Finalizado"){
            checkImg=img_end;    
            myBg="green";
        }
        else if(rowData.Estado==="En curso..."){
            checkImg=img_start;
        }
        else if(rowData.Estado==="Por empezar"){
            checkImg=img_start;
            myBg="gray";        }

        return (
            <React.Fragment>
                <div className={`grid bg-${myBg}-100 ml-2 p-2`} style={{minWidth:"900px"}}>
                    <div className="flex col-6">
                            <div className="flex align-items-center justify-content-center w-3">
                                <img alt={rowData.Estado} src={checkImg} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="50" style={{ verticalAlign: 'middle' }} />
                            </div>
                            <div className="flex flex-column w-9">
                                <span>Viaje: {rowData.Viaje} {HHMM_to_String(rowData.HoraInicioViaje)} - {HHMM_to_String(rowData.HoraFinViaje)}</span>
                                <span className={`text-${myBg}-800`}>{rowData.Estado}</span>
                            </div>
                    </div>
                    <div class="flex col-6 align-items-start">
                            <span>Carga: {HHMM_to_String(rowData.HoraCarga)} - {HHMM_to_String(rowData.HoraCargaSalida)}</span>
                            {rowData.HoraRealCarga!=="" && (<>
                                        <img className="mx-2" alt={rowData.HoraRealCarga} src={img_bt_check} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="20" style={{ verticalAlign: 'middle' }} />
                                        Cargado a las {HHMM_to_String(rowData.HoraRealCarga)}
                                        </>
                                    )
                            }
                    </div>
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
        const textColor=(rowData && rowData.HoraDestinoSalida<rowData.HoraRealDestino)?"text-red-500 text-sm lg:text-xs":"text-green-700 text-sm lg:text-xs";

        return (
            <React.Fragment>
                <img alt={rowData.HoraRealDestino} src={checkImg} onClick={(rowData) => onInfoServicio(rowData)} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="30" style={{ verticalAlign: 'middle' }} />
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
        return (
            <React.Fragment>
                    <div className="flex flex-column">
                        <span onClick={onInfoServicio}>{rowData.CodigoDestino}</span>
                        <span className='text-base lg:text-xs'>{rowData.CPDestino},{rowData.CiudadDestino}</span>
                    </div>
            </React.Fragment>
        );
    }
    const productsTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className='text-base lg:text-xs'>{rowData.Cantidad1Total} kgs. {rowData.Cantidad2Total} lts.</span>
            </React.Fragment>
        );
    }
    const statusTemplate = (rowData) => {
        // const sAux=rowData.Observaciones2.replace(/\r\n/g, "<br />");
        const sAux=rowData.Observaciones2;
        return (
            <React.Fragment>
                {rowData.Observaciones2 && rowData.Observaciones2!=="" && (
                    <div class="flex align-start flex-wrap">
                        <div class="flex align-items-start ">
                            <img alt="warning" src={img_warning} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="30" style={{ verticalAlign: 'middle' }} />
                        </div>
                        <div class="flex align-items-start ">
                            <span className='text-left text-red-500 text-base lg:text-xs ' dangerouslySetInnerHTML={{__html: sAux}}></span>
                        </div>
                    </div>
                )}
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

            <div className="card" style={{height:"85%"}}>
                <h5>{selResource.conductor} {selResource.tractora} {props.date}</h5>

                <DataTable value={trips} rowGroupMode="subheader" groupRowsBy="Viaje" className='text-left text-base lg:text-xs'
                    scrollable scrollHeight="flex"
                    sortMode="single" sortField="Viaje" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column body={checkTemplate} header="Confirmado"  className="w-1 "></Column>
                    <Column body={timeTemplate} header="" className="w-1 text-base lg:text-xs  "></Column>
                    <Column body={customerTemplate} header=""  className="w-1 "></Column>
                    <Column body={productsTemplate} header=""  className="w-1 "></Column>
                    <Column body={statusTemplate} header=""  className="w-8 flex-grow-1 "></Column>
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